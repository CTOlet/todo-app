import { tokenOptions } from '../../config';
import { database as db } from '../../services';
import { Token } from '../../types';

const createTokenInDB = async ({
  userId,
  token,
}: Pick<Token, 'userId' | 'token'>) => {
  return await db.query(
    `
      INSERT INTO tokens (user_id, token, expires_in)
      VALUES ($1, $2, $3)
    `,
    [userId, token, tokenOptions.tokenExpiresIn],
  );
};

const updateTokenInDB = async ({
  token,
  newToken,
}: Pick<Token, 'token'> & { newToken: string }) => {
  return await db.query<Token>(
    `
      UPDATE tokens
      SET token=$1, expires_in=$2
      WHERE token=$3
    `,
    [newToken, tokenOptions.tokenExpiresIn, token],
  );
};

const getTokenFromDB = async ({ token }: Pick<Token, 'token'>) => {
  const {
    rows: [tokenDB],
  } = await db.query<Token>(
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

const removeTokenFromDB = async ({ token }: Pick<Token, 'token'>) => {
  return await db.query(
    `
      DELETE FROM tokens
      WHERE token=$1
    `,
    [token],
  );
};

export { createTokenInDB, updateTokenInDB, getTokenFromDB, removeTokenFromDB };