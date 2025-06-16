export const saltRounds = Number(process.env.SALT_ROUNDS) ?? 10;
export const accessTokenSecret = String(process.env.ACCESS_TOKEN_SECRET) ?? '';
export const refreshTokenSecret =
  String(process.env.REFRESH_TOKEN_SECRET) ?? '';
export const accessTokenExpirationTime =
  Number(process.env.ACCESS_TOKEN_EXPIRATION_TIME) ?? 60;
export const refreshTokenExpirationTime =
  Number(process.env.REFRESH_TOKEN_EXPIRATION_TIME) ?? 3600;
