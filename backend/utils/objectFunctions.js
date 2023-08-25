function trimObject(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => trimObject(item));
  }

  const trimmedObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      trimmedObj[key.trim()] = trimObject(value);
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

module.exports = { trimObject, isEmptyNullOrUndefined };
