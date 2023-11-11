import bcrypt from "bcryptjs";

export async function generateHash(data: string, saltRound: number = 10) {
  const salt = await bcrypt.genSalt(saltRound);
  const hashedData = await bcrypt.hash(data, salt);

  return hashedData;
}
