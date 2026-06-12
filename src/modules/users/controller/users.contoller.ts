import { Request, Response, NextFunction } from "express";
import { userLoginService, userRegisterService } from "../services/users.services";

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;
    const { user } = await userRegisterService({username, email, password});

    res.status(201).json({name : user.username, email: user.email});
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await userLoginService(email, password);
    res.status(200).json({name : user.username, email: user.email, token: token});
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser };
