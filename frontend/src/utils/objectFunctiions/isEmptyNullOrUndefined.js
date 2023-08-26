export const isEmptyNullOrUndefined = (variable) => {
  if (variable === null || variable === undefined) {
    return true;
  }

  if (typeof variable === "object" && Object.keys(variable).length === 0) {
    return true;
  }

  return false;
};
