const { expect } = require('chai');
const { add } = require('../src/stringCalculator');
describe('StringCalculator Algorithm', () => {

    describe('stringCalculatorTests', () => {
        //The calculator should return 0 when an empty string is passed.
        it('should return 0 for an empty string', () => {
           const result = add("");
           expect(result).to.equal(0);
        });  
        
       // The calculator should return the same number when a single number is passed. 
        it('should return the number itself for a single number input', () => {
            expect(add("1")).to.equal(1);
            expect(add("25")).to.equal(25);
          });
    });
});
