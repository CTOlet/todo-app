const parseCookies = (cookies?: string): Record<any, any> => {
  return cookies
    ? cookies?.split(';').reduce((acc, curr) => {
        const [key, value] = curr.trim().split('=');
        return { ...acc, [key]: value };
      }, {})
    : {};
};

const parseAuthHeader = (header?: string) => {
  const [type, value] = header ? header.split(' ') : [undefined, undefined];
  return { type, value };
};

export { parseCookies, parseAuthHeader };
