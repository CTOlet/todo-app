const ServerResponseType = {
  ERROR: {
    DEFAULT: 'ERROR',
    AUTH: 'AUTH_ERROR',
    USER: 'USER_ERROR',
    TODO: 'TODO_ERROR',
  },
  SUCCESS: {
    DEFAULT: 'SUCCESS',
    USER: 'USER_SUCCESS',
  },
} as const;

export { ServerResponseType };