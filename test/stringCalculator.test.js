const {expect} = require('chai');
const {add} = require('../src/stringCalculator');

describe('StringCalculator Algorithm', () => {
  describe('stringCalculatorTests', () => {
    // The calculator should return 0 when an empty string is passed.
    it('should return 0 for an empty string', () => {
      const result = add('');
      expect(result).to.equal(0);
    });

    // The calculator should return the same number when a single number is passed.
    it('should return the number itself for a single number input', () => {
      expect(add('1')).to.equal(1);
      expect(add('25')).to.equal(25);
    });

    it('should return the sum of two numbers separated by a comma', () => {
      expect(add('1,2')).to.equal(3);
      expect(add('15,30')).to.equal(45);
    });

    it('should return the sum of an unknown number of numbers separated by commas', () => {
      expect(add('1,2,3,4')).to.equal(10);
      expect(add('10,20,30,40')).to.equal(100);
    });

    it('should allow newlines as valid delimiters and return the sum', () => {
      expect(add('1\n2,3')).to.equal(6);
      expect(add('4\n5\n6')).to.equal(15);
    });

    it('should return an error when a comma is immediately followed by a newline', () => {
      expect(() => add('1,\n')).to.throw(Error, 'Invalid format: comma followed by newline');
      expect(() => add('2,\n3')).to.throw(Error, 'Invalid format: comma followed by newline');
    });

    it('should support a custom delimiter specified in the format "//[delimiter]\\n"', () => {
      expect(add('//;\n1;2')).to.equal(3);
      expect(add('//$$$\n1$$$2$$$6')).to.equal(9);
      expect(add('//****\n3****5')).to.equal(8);
    });

    it('should support custom delimiters of any length', () => {
      expect(add('//[***]\n1***2***3')).to.equal(6);
      expect(add('//[#####]\n10#####20#####30')).to.equal(60);
      expect(add('//[$$$$]\n3$$$$4$$$$5')).to.equal(12);
    });

    it('should throw an exception for negative numbers', () => {
      expect(() => add('1,-2,3')).to.throw(Error, 'negatives not allowed: -2');
      expect(() => add('2,-3,-4')).to.throw(Error, 'negatives not allowed: -3, -4');
    });

    it('should ignore numbers larger than 1000', () => {
      expect(add('2,1001')).to.equal(2);
      expect(add('1000,999,1001')).to.equal(1999);
    });

    it('should handle combination of delimiters, numbers, and newlines', () => {
      expect(add('//;\n1;2\n3')).to.equal(6);
      expect(add('//[***]\n10***20\n30')).to.equal(60);
    });

    it('should throw an error for non-numeric characters', () => {
      expect(() => add('1,a,2')).to.throw(Error, 'Invalid non-numeric character');
      expect(() => add('//;\n1;a;2')).to.throw(Error, 'Invalid non-numeric character');
    });
  });
});
