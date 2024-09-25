function add(numbers) {
  if (numbers === "") return 0;

  const numArray = splitNumbers(numbers);
  const singleNumberResult = handleSingleNumber(numArray);
  if (singleNumberResult !== null) return singleNumberResult;

  return 0;
}

function splitNumbers(numbers) {
  return numbers.split(",");
}

function handleSingleNumber(numArray) {
  if (numArray.length === 1) {
    return parseInt(numArray[0]);
  }
  return null;
}

module.exports = { add };
