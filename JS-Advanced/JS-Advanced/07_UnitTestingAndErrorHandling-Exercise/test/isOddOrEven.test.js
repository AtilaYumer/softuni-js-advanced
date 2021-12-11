const {expect} = require('chai');
const {isOddOrEven} = require('../isOddOrEven');

describe('isOddOrEven(string) returns whether string length is odd or even', () => {
    it('should return odd for isOddOrEven("asd")', function () {
        expect(isOddOrEven('asd')).to.equal('odd')
    });

    it('should return even for isOddOrEven("even")', function () {
        expect(isOddOrEven('even')).to.equal('even');
    });

    it('should return undefined for isOddOrEven(undefined)', function () {
        expect(isOddOrEven(undefined)).to.be.undefined;
    });

    it('should return undefined for isOddOrEven(() => console.log("test")))', function () {
        expect(isOddOrEven(() => console.log("test"))).to.be.undefined;
    });
})