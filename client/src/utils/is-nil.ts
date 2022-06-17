/**
 * Returns true if given value is null or undefined otherwise false.
 *
 * @param value
 * @returns boolean
 */
const isNil = <T>(value: T | undefined | null): value is undefined | null => {
  return value === undefined || value === null;
};

export { isNil };
