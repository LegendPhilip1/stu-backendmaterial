export const delEmptyQueryNodes = (obj = {}) => {
  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    value && typeof value === "object" && delEmptyQueryNodes(value);
    if (value === "" || value === "null" || Object.keys(value).length === 0) {
      delete obj[key];
    }
    if (value.length != 0 && !isNaN(Number(value))) {
      obj[key] = Number(obj[key]);
    }
  });
  return obj;
};
