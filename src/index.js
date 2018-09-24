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

function walkThrough(dir, outputPath, extn, allFiles = []) {
    const files = fs.readdirSync(dir).map(f => join(dir, f))
    allFiles.push(...files)
    files.forEach(f => {
        if (fs.statSync(f).isDirectory()) {
            walkThrough(f, outputPath, extn, allFiles);
        } else {
            if (isExtnValid(f, 'js')) {
                const contents = fs.readFileSync(f).toString();
                fs.appendFileSync(outputPath, contents);
            };
        }
    })
    return allFiles
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







console.log(bundle({ path: 'static', extn: 'js' }));
console.log("successs");
