export const trimObject = (obj) => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(trimObject);
  }

  const trimmedObj = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];

      if (typeof value === "string") {
        trimmedObj[key] = value.trim();
      } else if (typeof value === "object") {
        trimmedObj[key] = trimObject(value);
      } else {
        trimmedObj[key] = value;
      }
    }
  }

  return trimmedObj;
};
