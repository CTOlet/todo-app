const isNil = <T>(x: T | undefined | null): x is undefined | null => {
  return x === undefined || x === null;
};

export { isNil };
