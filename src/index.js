const path = require('path');
const { lstatSync, lstat, readdirSync } = require('fs');
const fs = require('fs');


function bundle(options, callback) {
    if (!options.path) throw new Error("invalid input folder");
    if (!options.extn) throw new Error("Extension 'extn' is required");
    //if (!Array.isArray(options.extn)) await Promise.reject(new Error("Extension 'extn' should be an array"));
    const sourcePath = path.join(process.cwd(), options.path);
    const outputPath = createOutputFile(options);
    let count = 0;
    walkThrough(sourcePath, outputPath, options.extn, count, callback);

}


function walkThrough(sourcePath, outputPath, extn, count, callback) {
    console.log(count);
    if (isDirectory(sourcePath)) {
        const files = fs.readdirSync(sourcePath);

        console.log("lengthtttttttt" + files.length);
        files.forEach((file) => {
            count++;
            // console.log("+++" + extn);
            const innerFile = path.join(sourcePath, file);
            // if (isDirectory(innerFile)) {
            //     console.log(path.join(sourcePath, innerFile));
            // } else {
            //     console.log(isExtnValid(file, extn));
            //     if (isExtnValid(file)) {
            //         console.log(file);
            //     }
            // }
            console.log("inner" + innerFile);
            console.log("shakala" + count);
            fs.stat(innerFile, (error, stats) => {
                if (stats.isDirectory()) {
                    count--;
                    console.log("countttttttt" + count);
                    walkThrough(innerFile, outputPath, extn, count, callback);
                } else {
                    count--;
                    if (isExtnValid(innerFile, extn)) {
                        const contents = fs.readFileSync(innerFile).toString();
                        fs.appendFileSync(outputPath, contents);
                    };
                    if (count <= 0) {
                        callback(outputPath);
                    }
                }
            });
            console.log("finish" + count);
        });
    } else {
        console.log("doneeee");
        //return Promise.resolve(sourcePath);
        callback(outputPath);
    }
    //console.log("*****" + count);
    //return Promise.resolve(outputPath);
};



const isExtnValid = (file, extn) => {
    const extName = path.extname(file).split('.').pop();
    return extName === extn;
}
const createOutputFile = (options) => {
    const outputPath = options.output ? options.output : path.resolve(process.cwd(), 'bundle-me.' + options.extn);
    fs.writeFileSync(outputPath, '');
    return outputPath;
}
const isDirectory = (path) => {
    return lstatSync(path).isDirectory();
}

const isFile = (filePath) => {
    return lstatSync(filePath).isFile();
}




bundle({ path: '', extnasd: 'js' }, function (data) {
    console.log(data);
}).catch((error) => {
    console.log("error");
    console.log(error);
})