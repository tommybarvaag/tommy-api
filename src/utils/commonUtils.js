export const isString = value => Object.prototype.toString.call(value) === "[object String]";
export const memoize = func => {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    return key in cache ? cache[key] : (cache[key] = func(...args));
  };
};
