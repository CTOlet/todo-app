import bcrypt from 'bcrypt';

const generatePasswordHash = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

const comparePasswordHash = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export { generatePasswordHash, comparePasswordHash };
