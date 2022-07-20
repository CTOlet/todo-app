import jwt from 'jsonwebtoken';

const generateAccessToken = <T extends Record<any, any>>(payload: T) => {
  return jwt.sign(payload, 'TODO:SECRET_KEY');
};

const verifyAccessToken = (token: string) => {
  return jwt.verify(token, 'TODO:SECRET_KEY');
};

export { generateAccessToken, verifyAccessToken };
