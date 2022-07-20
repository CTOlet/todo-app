import crypto from 'crypto';
import { Pool } from 'pg';
import { RefreshToken } from '../types';

const generateRefreshToken = () => {
  return crypto.randomBytes(48).toString('base64url');
};

const verifyRefreshToken = async (token: string, pg: Pool) => {
  const tokens = await pg.query<RefreshToken>(
    `
      SELECT
        id,
        user_id AS "userId",
        created_at AS "createdAt",
        updated_at AS "updatedAt",
        token,
        expires_in AS "expiresIn",
      FROM tokens WHERE token=$1
    `,
    [token],
  );

  const isSingleToken = tokens.rows.length === 1;
  const isNotExpired = tokens.rows[0].expiresIn > Date.now();

  if (isSingleToken && isNotExpired) {
    return true;
  } else {
    return false;
  }
};

export { generateRefreshToken, verifyRefreshToken };
