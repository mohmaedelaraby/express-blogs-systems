import express ,  { Request, Response } from "express";
import dotenv from "dotenv";
import app from "../src/lib/express/express";
import "./routes/routes";


dotenv.config();

const port = Number(process.env.PORT) || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
