type ResponseError = {
  code: number;
  message: string;
};

type ResponseSuccess<Data = undefined> = {
  code: number;
  message: string;
  data?: Data;
};

export type { ResponseError, ResponseSuccess };
