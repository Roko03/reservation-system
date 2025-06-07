export type PaginatedResponse<T> = {
  entities: T[];
  totalCount: number;
  pagination?: {
    pageNumber: number;
    pageSize: number;
  };
};

export type PayloadResponse<T> = {
  payload: T;
  message?: string;
};

export type LoginResponse = {
  token: string;
  refreshToken: string;
  userId: number;
};

export type RegisterResponse = {
  message: string;
};

export type VerifyResponse = {
  message: string;
  error: string;
  statusCode: number;
};
