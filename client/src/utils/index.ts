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

const decodeJWT = <T extends Record<string, any>>(token: string): T => {
  var [, base64Url] = token.split('.');
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join(''),
  );

  return JSON.parse(jsonPayload) as T;
};

export { isNil, isString, replaceAt, decodeJWT };
