# bundle-me [![Build Status](https://travis-ci.org/ajay2507/bundle-me.svg?branch=master)](https://travis-ci.org/ajay2507/bundle-me)


## Install

```
$ npm install --save bundle-me
```


## Usage

```js
const bundleMe = require('bundle-me');

 try {
        bundleMe({ path: filePath, extn: 'js', outputPath: 'example/bundle.js' });
    }
    catch (error) {
        console.log(error);
    }
```

## Options

```json
path : input path of the source directory
extn : File Extension (js,css,ts,etc.)
outputPath: path of the output file. 
```


## Problem

I need to Bundle all the files in a particular directory based on the extension. I know many libraries are available but it's not simple to use. I need to tweek it a lot.

## Solution

Created bundle-me module, which bundle all the files based on the directory into single output file based on your options provided. It provides array of all the files based on the file extension provided.

## License

MIT 
