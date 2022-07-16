import { isNil } from './is-nil';

const replaceAt = <T>(array: T[], index: number, value: T) => {
  if (isNil(array) || (isNil(index) && index !== -1) || isNil(value)) {
    return array;
  } else {
    return Object.assign([], array, { [index]: value });
  }
};

export { replaceAt };
