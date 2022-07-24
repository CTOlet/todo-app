import bcrypt from 'bcrypt';

const generatePasswordHash = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

const verifyPasswordHash = async ({
  password,
  passwordHash,
}: {
  password: string;
  passwordHash: string;
}) => {
  return await bcrypt.compare(password, passwordHash);
};

export { generatePasswordHash, verifyPasswordHash };
