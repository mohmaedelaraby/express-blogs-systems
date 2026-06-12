import prismaClient from "../../../lib/prisma/prisma-client";
export const userRegisterRepo = async (
  username: string,
  email: string,
  password: string,
) => {
  return await prismaClient.user.create({
    data: {
      name : username,
      email,
      password,
    },
  });
};
export const userLoginRepo = async (email: string) => {
  return await prismaClient.user.findUnique({
    where: {
      email,
    },
  });
};

export const getUserByIdRepo = async (id: string) => {
  return await prismaClient.user.findUnique({
    where: {
      id,
    },
  });
};
