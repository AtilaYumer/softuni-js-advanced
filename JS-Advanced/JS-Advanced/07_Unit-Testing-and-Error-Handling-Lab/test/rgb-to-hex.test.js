const {expect} = require('chai');
const {rgbToHexColor} = require('../unit-testing/rgb-to-hex');

import('../unit-testing/rgb-to-hex');
import('chai');

describe('rgb-to-hex - return color code', function () {
    it('should return #B50710 for (181, 7, 16)', function () {
        expect(rgbToHexColor(181, 7, 16)).to.equal('#B50710');
    });

    it('should return #000000 for (0, 0, 0)', function () {
        expect(rgbToHexColor(0, 0, 0)).to.equal('#000000');
    });

    it('should return #FFFFFF for (0, 0, 0)', function () {
        expect(rgbToHexColor(255, 255, 255)).to.equal('#FFFFFF');
    });

    it('should return undefined for (-181, 7, 16)', function () {
        expect(rgbToHexColor(-181, 7, 16)).to.equal(undefined);
    });

    it('should return undefined for (181, -7, 16)', function () {
        expect(rgbToHexColor(181, -7, 16)).to.equal(undefined);
    });

    it('should return undefined for (181, 7, -16)', function () {
        expect(rgbToHexColor(181, 7, -16)).to.equal(undefined);
    });

    it('should return undefined for (256, 7, 16)', function () {
        expect(rgbToHexColor(256, 7, 16)).to.equal(undefined);
    });

    it('should return undefined for string argument ("181", 7, 16)', function () {
        expect(rgbToHexColor('181', 7, 16)).to.equal(undefined);
    });

    it('should return undefined for ()', function () {
        expect(rgbToHexColor()).to.equal(undefined);
    });
});