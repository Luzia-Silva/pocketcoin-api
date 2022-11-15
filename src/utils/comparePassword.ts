import bcrypt from "bcrypt";

export async function comparePassword(password: string, hashed: string) {
  const match = await bcrypt.compare(password, hashed);
  if (match) {
    return match;
  } else return match;
}
