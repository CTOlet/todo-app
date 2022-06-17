/**
 * Returns true if given value is a string otherwise false.
 *
 * @param value
 * @returns boolean
 */
const isString = <T>(value: T | string): value is string =>
  typeof value === 'string' || value instanceof String;

export { isString };
