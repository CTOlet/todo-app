const ErrorType = {
  POST_TODO_EXCEPTION: 'post_todo_exception',
  GET_TODO_EXCEPTION: 'get_todo_exception',
  PUT_TODO_EXCEPTION: 'put_todo_exception',
  DELETE_TODO_EXCEPTION: 'delete_todo_exception',
  SIGN_UP_USER_EXCEPTION: 'sign_up_user_exception',
  SIGN_IN_USER_EXCEPTION: 'sign_in_user_exception',
  CHECK_AUTH_USER_EXCEPTION: 'check_auth_user_exception',
} as const;

export { ErrorType };
