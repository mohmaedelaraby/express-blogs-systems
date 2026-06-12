
const jwt = require("jsonwebtoken");
import { IUser } from "../models/users.model";

const JWT_ACTIVE_KEY = process.env.JWT_ACTIVE_KEY;
const JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY;

const generateToken = (user: IUser) => {
  const payload = {
    email: user.email,
    password: user.password,
  };
  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, JWT_ACTIVE_KEY, options);
};

const verifyActiveToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_ACTIVE_KEY);
  } catch (error) {
    return null;
  }
};

const decodeExpiredActiveToken = (token: string) => {
  try {
    jwt.verify(token, JWT_ACTIVE_KEY);
    return null;
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return jwt.decode(token);
    }
    return null;
  }
};

const generateRefreshToken = (user: IUser) => {
  const payload = {
    email: user.email,
  };
  const options = {
    expiresIn: "7d",
  };
  return jwt.sign(payload, JWT_REFRESH_KEY, options);
};
const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_REFRESH_KEY);
  } catch (error) {
    return null;
  }
};

export {
  generateToken,
  verifyActiveToken,
  decodeExpiredActiveToken,
  generateRefreshToken,
  verifyRefreshToken,
};
