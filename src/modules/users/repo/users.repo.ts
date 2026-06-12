import prisma from "../../../lib/prisma/prisma-client";


 export const userRegisterRepo = async (username: string, email: string, password: string) => {
    return await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
  }
export const userLoginRepo = async (email: string) => {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

