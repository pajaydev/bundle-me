const bundlejs = require('../src/index');

function bundleMe(filePath) {
    try {
        bundlejs({ path: filePath, extn: 'js' });
    }
    catch (error) {
        console.log(error);
    }
}

bundleMe('static');