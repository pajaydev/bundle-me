'use strict';

const path = require('path');
const fs = require('fs');
const { join } = require('path');


function createBundle(options) {
    if (!options) throw new Error("invalid input");
    if (!options.path) throw new Error("please provide valid input folder path");
    const sourcePath = path.join(process.cwd(), options.path);
    const outputPath = createOutputFile(options);
    return walkThrough(sourcePath, outputPath, options.extn);
}

// iterate through all the files.
function walkThrough(sourcePath, outputPath, extn = 'js') {
    const files = getFiles(sourcePath);
    console.log(files);
    files.forEach(file => {
        if (fs.statSync(file).isDirectory()) {
            walkThrough(file, outputPath, extn);
        } else {
            if (isExtnValid(file, extn)) {
                const contents = fs.readFileSync(file).toString();
                fs.appendFileSync(outputPath, contents);
            };
        }
    })
    return outputPath;
};

/* Get all files in the input directory and returns 
the array of files. */
function getAllFiles(options, fileArray = []) {
    if (!options) throw new Error("invalid input");
    if (!options.path) throw new Error("please provide valid input folder path");
    const sourcePath = path.join(process.cwd(), options.path);
    return iterateFiles(sourcePath, options.extn, []);
}

function iterateFiles(sourcePath, extn, fileArray = []) {
    const files = getFiles(sourcePath);
    fileArray.push(...files);
    files.forEach(file => {
        if (fs.statSync(file).isDirectory()) {
            iterateFiles(file, extn, fileArray);
        }
    });
    if (extn) {
        fileArray = fileArray.filter((f) => {
            return isExtnValid(f, extn);
        })
    }
    return fileArray;
}

// get all the file names in the given directory
const getFiles = (sourcePath) => {
    if (fs.statSync(sourcePath).isDirectory()) {
        return fs.readdirSync(sourcePath).map(file => join(sourcePath, file))
    }
    return [sourcePath];
};

// check extension is valid or not.
const isExtnValid = (file, extn) => {
    const extName = path.extname(file).split('.').pop();
    return extName === extn;
};

// create output bundle path.
const createOutputFile = (options) => {
    const extn = options.extn ? options.extn : 'js';
    const outputPath = options.outputPath ? path.resolve(options.outputPath) : path.resolve(process.cwd(), 'bundle-me.' + extn);
    fs.writeFileSync(outputPath, '');
    return outputPath;
}


module.exports = {
    getAllFiles,
    createBundle
};
