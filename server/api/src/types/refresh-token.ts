type RefreshToken = {
  id: string;
  userId: string;
  createdAt: number;
  updatedAt: number;
  token: string;
  expiresIn: number;
};

export type { RefreshToken };
