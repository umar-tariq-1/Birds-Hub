function reorderObject(obj, order) {
  const orderedObj = {};

  order.forEach((key) => {
    if (obj.hasOwnProperty(key)) {
      orderedObj[key] = obj[key];
    }
  });

  // Add any remaining properties not in the order array
  for (const key in obj) {
    if (!orderedObj.hasOwnProperty(key)) {
      orderedObj[key] = obj[key];
    }
  }

  return orderedObj;
}

export const reorderKeys = (arr, order) => {
  if (arr === null || arr === undefined || arr === []) {
    return [];
  }

  if (arr[0] === null || arr[0] === undefined) {
    return [];
  }

  const reorderedArray = arr.map((obj) => {
    return reorderObject(obj, order);
  });
  return reorderedArray;
};
