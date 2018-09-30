const bundlejs = require('../src/index');

function getAllFiles(filePath) {
    try {
        bundlejs({ path: filePath, extn: 'js' }).files;
    }
    catch (error) {
        console.log(error);
    }
};


function bundleMe(filePath) {
    try {
        bundlejs({ path: filePath, extn: 'js' }).createBundle;
    }
    catch (error) {
        console.log(error);
    }
};