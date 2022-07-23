import { database as db } from '../../services';
import { RefreshToken } from '../../types';

const createTokenInDB = async ({
  userId,
  token,
  // TODO: set correct expiration
  expiresIn = Math.trunc((Date.now() + 86400000) / 1000),
}: {
  userId: string;
  token: string;
  expiresIn?: number;
}) => {
  return await db.query(
    `
      INSERT INTO tokens (user_id, token, expires_in)
      VALUES ($1, $2, $3)
    `,
    [userId, token, expiresIn],
  );
};

const updateTokenInDB = async ({
  token,
  newToken,
  // TODO: set correct expiration
  expiresIn = Math.trunc((Date.now() + 86400000) / 1000),
}: {
  token: string;
  newToken: string;
  expiresIn?: number;
}) => {
  return await db.query<RefreshToken>(
    `
      UPDATE tokens
      SET token=$1, expires_in=$2
      WHERE token=$3
    `,
    [newToken, expiresIn, token],
  );
};

const getTokenFromDB = async ({ token }: { token: string }) => {
  const {
    rows: [tokenDB],
  } = await db.query<RefreshToken>(
    `
      SELECT
        id,
        user_id AS "userId",
        created_at AS "createdAt",
        updated_at AS "updatedAt",
        token,
        expires_in AS "expiresIn"
      FROM tokens WHERE token=$1
    `,
    [token],
  );
  return tokenDB;
};

export { createTokenInDB, updateTokenInDB, getTokenFromDB };
