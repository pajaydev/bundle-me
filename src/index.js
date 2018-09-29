'use strict';

const path = require('path');
const fs = require('fs');
const { join } = require('path');

function bundle(options) {
    if (!options) throw new Error("invalid input");
    if (!options.path) throw new Error("please provide valid input folder path");
    if (!options.extn) options.extn = 'js';
    //if (!Array.isArray(options.extn)) await Promise.reject(new Error("Extension 'extn' should be an array"));
    const sourcePath = path.join(process.cwd(), options.path);
    const outputPath = createOutputFile(options);
    return walkThrough(sourcePath, outputPath, options.extn);
};

function walkThrough(sourcePath, outputPath, extn, fileArray = []) {
    const files = getAllFiles(sourcePath);
    files.forEach(file => {
        if (fs.statSync(file).isDirectory()) {
            walkThrough(file, outputPath, extn, fileArray);
        } else {
            if (isExtnValid(file, 'js')) {
                fileArray.push(...files);
                const contents = fs.readFileSync(file).toString();
                fs.appendFileSync(outputPath, contents);
            };
        }
    })
    return {
        _files: fileArray,
        _outputPath: outputPath
    }
};


const getAllFiles = (sourcePath) => {
    return fs.readdirSync(sourcePath).map(file => join(sourcePath, file))
};

// check extension is valid or not.
const isExtnValid = (file, extn) => {
    const extName = path.extname(file).split('.').pop();
    return extName === extn;
};

const createOutputFile = (options) => {
    const outputPath = options.output ? options.output : path.resolve(process.cwd(), 'bundle-me.' + options.extn);
    fs.writeFileSync(outputPath, '');
    return outputPath;
}


module.exports = bundle;
//console.log(bundle());

function ajay() {
    try {
        bundle({ path: "static" })
    } catch (error) {
        console.log(error);
    }
}

ajay();

