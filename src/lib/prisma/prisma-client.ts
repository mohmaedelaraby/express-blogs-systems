import { PrismaClient } from "../../generated/prisma/client";

const prismaClient = new PrismaClient();

prismaClient
  .$connect()
  .then(() => console.log("Database connected"))
  .catch((error: unknown) => console.error("Database connection failed:", error));

export default prismaClient;
