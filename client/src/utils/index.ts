/**
 * Returns true if given value is null or undefined otherwise false.
 *
 * @param value
 * @returns boolean
 */
const isNil = <T>(value: T | undefined | null): value is undefined | null => {
  return value === undefined || value === null;
};

/**
 * Returns true if given value is a string otherwise false.
 *
 * @param value
 * @returns boolean
 */
const isString = <T>(value: T | string): value is string =>
  typeof value === 'string' || value instanceof String;

const replaceAt = <T>(array: T[], index: number, value: T) => {
  if (isNil(array) || (isNil(index) && index !== -1) || isNil(value)) {
    return array;
  } else {
    return Object.assign([], array, { [index]: value });
  }
};

export { isNil, isString, replaceAt };
