const parseCookies = (cookies?: string): Record<any, any> => {
  return cookies
    ? cookies?.split(';').reduce((acc, curr) => {
        const [key, value] = curr.trim().split('=');
        return { ...acc, [key]: value };
      }, {})
    : {};
};

export { parseCookies };
