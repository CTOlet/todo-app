import jwt from 'jsonwebtoken';

const generateAccessToken = <T extends Record<any, any>>(payload: T) => {
  // TODO: set global server secret key
  return jwt.sign(payload, 'SECRET_KEY');
};

const verifyAccessToken = (token: string) => {
  // TODO: set global server secret key
  return jwt.verify(token, 'SECRET_KEY');
};

export { generateAccessToken, verifyAccessToken };
