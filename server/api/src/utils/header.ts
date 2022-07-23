const parseAuthHeader = (header?: string) => {
  const [type, value] = header ? header.split(' ') : [undefined, undefined];
  return { type, value };
};

export { parseAuthHeader };
