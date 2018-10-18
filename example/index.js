const bundlejs = require('../src/index');

function getAllFiles(filePath) {
    try {
        bundlejs({ path: filePath, extn: 'js' }).files();
    }
    catch (error) {
        console.log(error);
    }
};


function bundleMe(filePath) {
    try {
        bundlejs({ path: filePath }).createBundle;
    }
    catch (error) {
        console.log(error);
    }
};

getAllFiles('static');
//console.log(bundlejs({ path: 'static', extn: 'js' }));