'use strict';

const path = require('path');
const fs = require('fs');
const { join } = require('path');

function bundleResource(options) {
    if (!options) throw new Error("invalid input");
    if (!options.path) throw new Error("please provide valid input folder path");
    //if (!Array.isArray(options.extn)) await Promise.reject(new Error("Extension 'extn' should be an array"));

    return {
        createBundle: createBundle,
        files: getAllFiles
    }
};

function createBundle(sourcePath, options) {
    console.log("createeee");
    const outputPath = createOutputFile(options);
    return walkThrough(sourcePath, outputPath, options.extn);
}

// iterate through all the files.
function walkThrough(sourcePath, outputPath, extn = 'js') {
    const files = getFiles(sourcePath);
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
function getAllFiles(options) {
    console.log("get all files" + sourcePath);
    if (!options) throw new Error("invalid input");
    if (!options.path) throw new Error("please provide valid input folder path");
    const sourcePath = path.join(process.cwd(), options.path);
    const files = getFiles(sourcePath);
    fileArray.push(...files);
    files.forEach(file => {
        if (fs.statSync(file).isDirectory()) {
            getAllFiles(file, extn, fileArray);
        }
    });
    if (extn) {
        fileArray = fileArray.filter((f) => {
            return isExtnValid(f, extn);
        })
    }
    return fileArray;
}


const getFiles = (sourcePath) => {
    return fs.readdirSync(sourcePath).map(file => join(sourcePath, file))
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


module.exports = bundleResource;
