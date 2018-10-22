'use strict';

const assert = require('assert');
const expect = require('chai').expect;
const bundleMe = require('../src/index');
describe('Test bundle-me', () => {
    it("should contain bundleMe function", () => {
        expect(bundleMe).to.be.a('function');
    });

    it("Test getAllFiles method", () => {
        expect(bundleMe({ path: 'static' }).files.length).to.equal(3);
    });

    it("Test getAllFiles method with extn", () => {
        expect(bundleMe({ path: 'static', extn: 'js' }).files.length).to.equal(2);
        expect(bundleMe({ path: 'static', extn: 'css' }).files.length).to.equal(1);
    });

    it("should contain bundleMe function", () => {
        expect(bundleMe()).to.be.an('error');
    });
});

