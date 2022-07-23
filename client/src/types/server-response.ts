type ErrorResponse = {
  code: number;
  type: string;
  message: string;
};

type SuccessResponse<Data = undefined> = {
  code: number;
  type: string;
  message: string;
  data?: Data;
};

export type { ErrorResponse, SuccessResponse };
