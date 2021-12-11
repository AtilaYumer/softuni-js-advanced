const {expect} = require('chai');
const {createCalculator} = require('../unit-testing/addSubtract');

describe('createCalculator - returns object to modify internal sum', function () {
    let instance;
    beforeEach(function () {
        instance = createCalculator();
    });

    it('should return 3 functions', function () {
        expect(instance).to.hasOwnProperty('add');
        expect(instance).to.hasOwnProperty('subtract');
        expect(instance).to.hasOwnProperty('get');
    });

    it('should return zero when instance.get()', function () {
        expect(instance.get()).to.equal(0);
    });

    it('should add 3 when instance.add(3)', function () {
        instance.add(3);
        expect(instance.get()).to.equal(3);
    });

    it('should subtract -3 when instance.subtract(3).', function () {
        instance.subtract(3);
        expect(instance.get()).to.equal(-3);
    });

    it('should return 3 when instance.add("3")', function () {
        instance.add('3');
        expect(instance.get()).to.equal(3);
    });

    it('should return -3 when instance.subtract("3")', function () {
        instance.subtract('3');
        expect(instance.get()).to.equal(-3);
    });
});