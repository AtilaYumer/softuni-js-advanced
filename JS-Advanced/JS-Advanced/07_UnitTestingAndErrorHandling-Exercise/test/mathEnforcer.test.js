const {expect} = require('chai');
const {mathEnforcer} = require('../mathEnforcer');

describe('mathEnforcer', () => {
    describe('addFive', () => {
        it('should return undefined for non number argument', function () {
            expect(mathEnforcer.addFive('3')).to.be.undefined;
        });

        it('should return correct result for floating point number', function () {
            expect(mathEnforcer.addFive(2.5)).to.be.equal(7.5);
        });

        it('should return correct result for integer number', function () {
            expect(mathEnforcer.addFive(3)).to.be.equal(8);
        });

        it('should return correct result for negative number', function () {
            expect(mathEnforcer.addFive(-5)).to.be.equal(0);
        });

        it('should return undefined for empty argument', function () {
            expect(mathEnforcer.addFive()).to.be.undefined;
        });
    });

    describe('subtractTen', () => {
        it('should return undefined for non number argument', function () {
            expect(mathEnforcer.addFive('2')).to.be.undefined;
        });

        it('should return correct result for floating point number', function () {
            expect(mathEnforcer.subtractTen(15.5)).to.be.equal(5.5);
        });

        it('should return correct result for integer number', function () {
            expect(mathEnforcer.subtractTen(15)).to.be.equal(5);
        });

        it('should return correct result for negative number', function () {
            expect(mathEnforcer.subtractTen(-5)).to.be.equal(-15);
        });

        it('should return undefined for empty argument', function () {
            expect(mathEnforcer.subtractTen()).to.be.undefined;
        });
    });

    describe('sum', () => {

        it('should return undefined for non number first argument', function () {
            expect(mathEnforcer.sum('1', 3)).to.be.undefined;
        });

        it('should return undefined for non number second argument', function () {
            expect(mathEnforcer.sum(1, '3')).to.be.undefined;
        });

        it('should return undefined for non both arguments', function () {
            expect(mathEnforcer.sum('1', '2')).to.be.undefined;
        });

        it('should return sum of numbers if they are type of number', function () {
            expect(mathEnforcer.sum(1, 3)).to.be.equal(4);
        });

        it('should return correct sum', function () {
            expect(mathEnforcer.sum(-10, 10)).to.be.equal(0);
        });

        it('should return correct sum of numbers for floating numbers', function () {
            expect(mathEnforcer.sum(0.0003, 0.0004)).to.be.equal(0.0007);
        });

        it('should return correct result for negative numbers', function () {
            expect(mathEnforcer.sum(-2, -5)).to.be.equal(-7);
        });
    });
})