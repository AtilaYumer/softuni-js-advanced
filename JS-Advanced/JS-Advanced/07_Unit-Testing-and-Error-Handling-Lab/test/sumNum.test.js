const  {expect} = require('chai')
const {sum} = require('../unit-testing/sumNumbers.js');

describe('sum(arr) - sum array of numbers ', () => {
    it('Should return 5 for [2,3]', ()=> {
        expect(sum([2, 3])).to.equal(5);
    });

    it('Should return 2 for [2]', () => {
        expect(sum([2])).to.equal(2);
    })

    it('Should return 0 for empty array', () => {
        expect(sum([])).to.equal(0);
    })
});