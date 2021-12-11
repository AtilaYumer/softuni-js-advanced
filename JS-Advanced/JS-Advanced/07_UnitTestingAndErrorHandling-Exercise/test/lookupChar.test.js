const {expect} = require('chai');
const {lookupChar} = require('../charLookUp');

describe('lookupChar(string, index) returns char at position', () => {
    it('should return undefined if first arg is not a string', function () {
        expect(lookupChar(undefined, 2)).to.be.undefined;
    });

    it('should return undefined if second arg is not a number', function () {
        expect(lookupChar('string', 'string')).to.be.undefined;
    });

    it('should return undefined if second arg is floating number', function () {
        expect(lookupChar('string', 1.2)).to.be.undefined;
    });

    it('should return "Incorrect index" for lookupChar("string", 8)', function () {
        expect(lookupChar('string', 6)).to.be.equal('Incorrect index');
    });

    it('should return "Incorrect index" for lookupChar("string", -1)', function () {
        expect(lookupChar('string', -1)).to.be.equal("Incorrect index");
    });

    it('should return "s" for lookupChar(0)', function () {
        expect(lookupChar('string', 0)).to.be.equal('s');
    });

    it('should return "r" for lookupChar(2)', function () {
        expect(lookupChar('string', 2)).to.be.equal('r');
    });

    it('should return "g" for lookupChar(5)', function () {
        expect(lookupChar('string', 5)).to.be.equal('g');
    });
})