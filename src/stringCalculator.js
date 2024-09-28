function add(input) {
  // If the input is empty, return 0
  if (input === "") return 0;

  // Check for custom delimiter
  let delimiter = ",";
  let numbers = input;

  if (input.startsWith("//")) {
    const delimiterEndIndex = input.indexOf("\n");
    // Remove brackets for regex
    delimiter = input.substring(2, delimiterEndIndex).replace(/\[|\]/g, "");
    numbers = input.substring(delimiterEndIndex + 1);
  }

  // Escape special regex characters in the delimiter
  const escapedDelimiter = delimiter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Create a regex from the escaped delimiter
  const regex = new RegExp(escapedDelimiter, "g");
  numbers = numbers.replace(regex, ",");

  // Check for invalid formats: comma followed by newline
  if (numbers.includes(",\n") || numbers.endsWith(",")) {
    throw new Error("Invalid format: comma followed by newline");
  }

  // Split numbers by commas and newlines
  const numArray = numbers
    .split(/[\n,]/)
    .map((num) => {
      if (num.trim() === "") return null; // Handle empty entries
      const parsedNum = Number(num);
      if (isNaN(parsedNum)) {
        throw new Error("Invalid non-numeric character");
      }
      return parsedNum;
    })
    .filter((num) => num !== null); // Remove any nulls from the array

  // Check for negative numbers
  const negatives = numArray.filter((num) => num < 0);
  if (negatives.length > 0) {
    throw new Error(`negatives not allowed: ${negatives.join(", ")}`);
  }

  // Filter out numbers greater than 1000
  const validNumbers = numArray.filter((num) => num <= 1000);

  // Return the sum of the numbers
  return validNumbers.reduce((sum, num) => sum + num, 0);
}

module.exports = { add };
