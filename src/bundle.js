'use strict';

class Bundle {
    constructor(options) {
        this.sourcePath = options.path;
        this.extn = options.extn;
        this.count = 0;
        this.outputPath = '';
    }
    setSourcePath(sourcePath) {
        this.sourcePath = sourcePath;
    }

    getSourcePath() {
        return this.sourcePath;
    }

    setCount(count) {
        this.count = count;
    }

    getCount() {
        return this.count;
    }

    setExtn(extn) {
        this.extn = extn;
    }

    getExtn() {
        return this.extn
    }

    setOutputPath() {
        this.outputPath = outputPath;
    }

    getOutputPath() {
        return this.getOutputPath();
    }
}