export const compareArraysOfObjects = (arr1, arr2) => {
  // Check if the arrays have the same length
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Sort the arrays of objects to ensure the same order
  const sortedArr1 = arr1
    .slice()
    .sort((a, b) => JSON.stringify(a) - JSON.stringify(b));
  const sortedArr2 = arr2
    .slice()
    .sort((a, b) => JSON.stringify(a) - JSON.stringify(b));

  // Compare each object in the sorted arrays
  for (let i = 0; i < sortedArr1.length; i++) {
    const obj1 = sortedArr1[i];
    const obj2 = sortedArr2[i];

    // Convert objects to JSON strings and compare
    if (JSON.stringify(obj1) !== JSON.stringify(obj2)) {
      return false;
    }
  }

  // If all objects are equal, the arrays are equal
  return true;
};
