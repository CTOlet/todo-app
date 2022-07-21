import bcrypt from 'bcrypt';

const generatePasswordHash = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

const verifyPassword = async (
  password: string,
  comparePasswordHash: string,
) => {
  return await bcrypt.compare(password, comparePasswordHash);
};

export { generatePasswordHash, verifyPassword };
