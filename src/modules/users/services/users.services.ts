import AppError from "../../../common/errors/app-error";
import { IUser } from "../models/users.model";
import {
  getUserByIdRepo,
  userLoginRepo,
  userRegisterRepo,
} from "../repo/users.repo";
import { comparePassword, hashPassword } from "../utils/bycript";
import { generateToken } from "../utils/jwt";

const userRegisterService = async (
  userData: IUser,
): Promise<{ user: IUser }> => {
  const { name: username, email, password } = userData;
  const hashedPassword = await hashPassword(password);
  const newUser = await userRegisterRepo(username, email, hashedPassword);
  return { user: newUser };
};

const userLoginService = async (
  email: string,
  password: string,
): Promise<{ user: IUser; token: string }> => {
  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }
  const user = await userLoginRepo(email);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new AppError("Invalid password", 401);
  }

  const token = generateToken(user); // Implement this function to generate JWT token
  return { user: user, token: token };
};

const getUserByIdService = async (id: string): Promise<IUser> => {
  const user = await getUserByIdRepo(id);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return user;
};
export { userRegisterService, userLoginService, getUserByIdService };
