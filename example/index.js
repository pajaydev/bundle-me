const { createBundle, getAllFiles } = require('../src/index');

function getFiles(filePath) {
    try {
        return getAllFiles({ path: filePath });
        //[ '/Users/aprathap/Documents/git/bundle-me/static/a.js',
        //'/Users/aprathap/Documents/git/bundle-me/static/b.js' ]
    }
    catch (error) {
        console.log(error);
    }
};


function bundleMe(filePath) {
    try {
        return createBundle({ path: filePath });
    }
    catch (error) {
        console.log(error);
    }
};

getFiles('static');
// [ '/Users/aprathap/Documents/git/bundle-me/static/a.css',
// '/Users/aprathap/Documents/git/bundle-me/static/a.js',
// '/Users/aprathap/Documents/git/bundle-me/static/b.js' ]

bundleMe('static');
// created bundle-me.js