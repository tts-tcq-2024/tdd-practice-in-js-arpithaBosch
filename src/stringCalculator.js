function add(input) {
  if (input === "") return 0;

  const { delimiter, numbers } = parseDelimiter(input);
  const parsedNumbers = parseNumbers(numbers, delimiter);

  validateNumbers(parsedNumbers);

  return sumNumbers(parsedNumbers);
}

// Function to parse the delimiter and extract numbers
function parseDelimiter(input) {
  let delimiter = ",";
  let numbers = input;

  if (input.startsWith("//")) {
      const delimiterEndIndex = input.indexOf("\n");
      delimiter = input.substring(2, delimiterEndIndex).replace(/\[|\]/g, "");
      numbers = input.substring(delimiterEndIndex + 1);
  }

  return { delimiter, numbers };
}

// Function to parse and validate numbers
function parseNumbers(numbers, delimiter) {
  const escapedDelimiter = escapeDelimiter(delimiter);
  const regex = new RegExp(escapedDelimiter, "g");
  numbers = numbers.replace(regex, ",");
  
  if (numbers.includes(",\n") || numbers.endsWith(",")) {
      throw new Error("Invalid format: comma followed by newline");
  }

  return numbers.split(/[\n,]/).map(num => {
      if (num.trim() === "") return null; // Handle empty entries
      const parsedNum = Number(num);
      if (isNaN(parsedNum)) {
          throw new Error("Invalid non-numeric character");
      }
      return parsedNum;
  }).filter(num => num !== null); // Remove any nulls
}

// Function to escape special regex characters in the delimiter
function escapeDelimiter(delimiter) {
  return delimiter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Function to validate numbers
function validateNumbers(numArray) {
  const negatives = numArray.filter(num => num < 0);
  if (negatives.length > 0) {
      throw new Error(`negatives not allowed: ${negatives.join(", ")}`);
  }
}

// Function to sum the numbers
function sumNumbers(numArray) {
  const validNumbers = numArray.filter(num => num <= 1000);
  return validNumbers.reduce((sum, num) => sum + num, 0);
}

module.exports = { add };
