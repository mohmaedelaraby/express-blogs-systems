import dotenv from "dotenv";
dotenv.config();

import express from "express";
import app from "../src/lib/express/express";
import { errorHandler } from "./common/errors/error-handler";
import routes from "./routes/routes";
import { globalVerifyToken } from "./common/verify/global-verify-token";

const port = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(globalVerifyToken);
app.use(routes);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
