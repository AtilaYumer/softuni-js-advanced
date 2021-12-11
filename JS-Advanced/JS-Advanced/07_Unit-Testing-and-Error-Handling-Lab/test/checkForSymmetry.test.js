const {expect} = require('chai');
const {isSymmetric} = require('../unit-testing/checkForSymmetry');

describe('isSymmetric(arr) - checks if array is symmetric', () => {
    it('should return true for [1, 2, 2, 1]', () => {
        expect(isSymmetric([1, 2, 2, 1])).to.equal(true);
    });

    it('should return false for [1, 2, 3, 4]', function () {
        expect(isSymmetric([1, 2, 3, 4])).to.equal(false);
    });

    it('should return false for non array input', function () {
        expect(isSymmetric(1)).to.equal(false);
    });

    it('should return true if empty array is passed', function () {
        expect(isSymmetric([])).to.equal(true);
    });

    it('should return false if array has mixed type of elements', function () {
        expect(isSymmetric([1, 2, '2', 1])).to.equal(false);
    });
});