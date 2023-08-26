export const findKeyWithEmptyStringValue = (obj) => {
  for (const key in obj) {
    if (
      obj.hasOwnProperty(key) &&
      typeof obj[key] === "string" &&
      obj[key] === ""
    ) {
      return key;
    }
  }
  return null;
};
