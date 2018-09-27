const path = require('path');
const fs = require('fs');
const { join } = require('path');

function bundle(options, callback) {
    if (!options.path) throw new Error("invalid input folder");
    if (!options.extn) throw new Error("Extension 'extn' is required");
    //if (!Array.isArray(options.extn)) await Promise.reject(new Error("Extension 'extn' should be an array"));
    const sourcePath = path.join(process.cwd(), options.path);
    const outputPath = createOutputFile(options);
    return walkThrough(sourcePath, outputPath, options.extn);

}

function walkThrough(sourcePath, outputPath, extn, fileArray = []) {
    const files = getAllFiles(sourcePath);

    files.forEach(f => {
        if (fs.statSync(f).isDirectory()) {
            walkThrough(f, outputPath, extn, fileArray);
        } else {
            if (isExtnValid(f, 'js')) {
                fileArray.push(...files);
                const contents = fs.readFileSync(f).toString();
                fs.appendFileSync(outputPath, contents);
            };
        }
    })
    return {
        _files: fileArray,
        _outputPath: outputPath
    }
}

const getAllFiles = (sourcePath) => {
    return fs.readdirSync(sourcePath).map(file => join(sourcePath, file))
}

const isExtnValid = (file, extn) => {
    const extName = path.extname(file).split('.').pop();
    return extName === extn;
}
const createOutputFile = (options) => {
    const outputPath = options.output ? options.output : path.resolve(process.cwd(), 'bundle-me.' + options.extn);
    fs.writeFileSync(outputPath, '');
    return outputPath;
}

