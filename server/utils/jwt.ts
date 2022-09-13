import jwt from "jsonwebtoken";

interface userProp {
  id: string;
  password: string;
}

function generateAccessToken(user: userProp) {
  return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "5m",
  });
}
function generateRefreshToken(user: userProp, jti: string) {
  return jwt.sign(
    {
      userId: user.id,
      jti,
    },
    process.env.JWT_REFRESH_SECRET!,
    {
      expiresIn: "30d",
    }
  );
}
function generateTokens(user: userProp, jti: string) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
}

export { generateAccessToken, generateRefreshToken, generateTokens };
