const ErrorResponseType = {
  DEFAULT_ERROR: 'ERROR',
  AUTH_ERROR: 'AUTH_ERROR',
  USER_ERROR: 'USER_ERROR',
  TODO_ERROR: 'TODO_ERROR',
} as const;

const SuccessResponseType = {
  DEFAULT_SUCCESS: 'SUCCESS',
  USER_SUCCESS: 'USER_SUCCESS',
} as const;

export { ErrorResponseType, SuccessResponseType };
