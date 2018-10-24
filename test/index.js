'use strict';

const assert = require('assert');
const expect = require('chai').expect;
const { createBundle, getAllFiles } = require('../src/index');
describe('Test bundle-me', () => {
    it("should contain createBundle and  getAllFiles function", () => {
        expect(createBundle).to.be.a('function');
        expect(getAllFiles).to.be.a('function');
    });

    it("Test getAllFiles method", () => {
        expect(getAllFiles({ path: 'static' }).length).to.equal(3);
    });

    it("Test getAllFiles method with extn", () => {
        expect(getAllFiles({ path: 'static', extn: 'js' }).length).to.equal(2);
        expect(getAllFiles({ path: 'static', extn: 'css' }).length).to.equal(1);
    });
});

