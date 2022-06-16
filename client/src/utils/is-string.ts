/**
 * Returns true if given value is a string otherwise false.
 *
 * @param x value
 * @returns boolean
 */
const isString = <T>(x: T | string): x is string =>
  typeof x === 'string' || x instanceof String;

export { isString };
