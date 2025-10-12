/**
 * A simple helper to get a value from a nested object.
 * @param {object} obj The object to query.
 * @param {string} path The path to the value.
 * @param {*} defaultValue The default value if the path is not found.
 * @returns {*} The value at the specified path or the default value.
 */
export function get(obj, path, defaultValue = null) {
  const travel = regexp =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
  const result = travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
}
