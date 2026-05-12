import jwt from "jsonwebtoken";

export const generateToken = (id: string) => {
  const config = useRuntimeConfig();
  return jwt.sign({ _id: id }, config.jwtSecret, { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
  const config = useRuntimeConfig();

  const decoded = jwt.verify(token, config.jwtSecret) as { _id: string };

  return decoded;
};
