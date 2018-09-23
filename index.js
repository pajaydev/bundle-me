const path = require('path');
const { lstatSync, readdirSync } = require('fs');
const fs = require('fs');

async function bundle(options) {

    if (!options.name) await Promise.reject(new Error("invalid input folder"));
    if (!options.extn) await Promise.reject(new Error("Extension 'extn' is required"));
    if (!Array.isArray(options.extn)) await Promise.reject(new Error("Extension 'extn' should be an array"));

    // console.log(path.resolve(process.cwd(), options.name));
    // const sourcePath = path.resolve(process.cwd(), options.name);
    // console.log(isDirectory(sourcePath));
    // const outputPath = createOutputFile(options);
    // if (isDirectory(sourcePath)) {
    //     console.log(fs.readdirSync(sourcePath));
    //     const files = fs.readdirSync(sourcePath);
    //     files.forEach((file) => {
    //         const innerFile = path.join(sourcePath, file);
    //         console.log(isFile(innerFile));
    //         if (isDirectory(innerFile)) {

    //         } else {

    //         }
    //     })
    // }
    // return isDirectory(sourcePath);
    // // if () {

    // }

}

const createOutputFile = (options) => {


    const outputPath = options.output ? options.output : path.resolve(process.cwd(), 'bundle-me.js');
    fs.writeFileSync(outputPath, '');
    return outputPath;
}
const isDirectory = (path) => {
    return lstatSync(path).isDirectory();
}

const isFile = (filePath) => {
    return lstatSync(filePath).isFile();
}





// find dir
// iterate through all files
// create new file
// 





bundle({ name: 'sample', extn: 'js' }).catch((error) => {
    console.log("error" + error);
})