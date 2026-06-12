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
  const { username, email, password } = userData;
  if (!username || !email || !password) {
    throw new Error("All fields are required");
  }
  const hashedPassword = await hashPassword(password);
  const newUser = await userRegisterRepo(username, email, hashedPassword);
  return { user: newUser };
};

const userLoginService = async (
  email: string,
  password: string,
): Promise<{ user: IUser; token: string }> => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  const user = await userLoginRepo(email);
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = generateToken(user.id); // Implement this function to generate JWT token
  return { user: user, token: token };
};

const getUserByIdService = async (id: number): Promise<IUser> => {
  const user = await getUserByIdRepo(id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};
export { userRegisterService, userLoginService, getUserByIdService };
