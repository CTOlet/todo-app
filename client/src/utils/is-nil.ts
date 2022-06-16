/**
 * Returns true if given value is null or undefined otherwise false.
 *
 * @param x value
 * @returns boolean
 */
const isNil = <T>(x: T | undefined | null): x is undefined | null => {
  return x === undefined || x === null;
};

export { isNil };
