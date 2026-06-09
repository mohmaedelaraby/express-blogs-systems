 import app from "../lib/express/express";
import  { Request, Response } from "express";


 app.get("/", (_req: Request, res: Response) => {
  res.send("Express + TypeScript API is running");
});