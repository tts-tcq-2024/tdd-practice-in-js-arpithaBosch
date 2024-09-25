const { expect } = require('chai');
const { add } = require('../src/stringCalculator');
describe('StringCalculator Algorithm', () => {

    describe('stringCalculatorTests', () => {
           it('should return 0 for an empty string', () => {
           const result = add("");
           expect(result).to.equal(0);
        });   
    });
});
