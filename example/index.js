const { createBundle, getAllFiles } = require('../src/index');

function getFiles(filePath) {
    try {
        getAllFiles({ path: filePath });
        //[ '/Users/aprathap/Documents/git/bundle-me/static/a.js',
        //'/Users/aprathap/Documents/git/bundle-me/static/b.js' ]
    }
    catch (error) {
        console.log(error);
    }
};


function bundleMe(filePath) {
    try {
        createBundle({ path: filePath });
    }
    catch (error) {
        console.log(error);
    }
};

getFiles('static');
//console.log(bundlejs({ path: 'static', extn: 'js' }));