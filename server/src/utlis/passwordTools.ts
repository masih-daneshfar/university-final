import * as bcrypt from "bcrypt";

export const passwordHasher = async (password: string) => {
  const passwordSalt = await bcrypt.genSalt(8);
  return bcrypt.hash(password, passwordSalt);
};
export const passwordCompere = async (
  password: string,
  savedPassword: string
) => {
  return bcrypt.compare(password, savedPassword);
};
