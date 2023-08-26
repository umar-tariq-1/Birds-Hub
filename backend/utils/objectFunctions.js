function trimObject(obj) {
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
}

function isEmptyNullOrUndefined(variable) {
  if (variable === null || variable === undefined) {
    return true;
  }

  if (typeof variable === "object" && Object.keys(variable).length === 0) {
    return true;
  }

  return false;
}

function findKeyWithEmptyStringValue(obj) {
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
}

module.exports = {
  trimObject,
  isEmptyNullOrUndefined,
  findKeyWithEmptyStringValue,
};
