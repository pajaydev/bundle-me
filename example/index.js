const bundlejs = require('../src/index');

function bundleMe(filePath) {
    try {
        console.log(bundlejs({ path: filePath, extn: 'js', outputPath: 'example/bundle.js' })._files);
    }
    catch (error) {
        console.log(error);
    }
}

bundleMe('static');