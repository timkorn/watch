import express from "express";
import dotenv from "dotenv";
import router from "./auth/auth.routes";
import filmRouter from "./films/films.routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Request, Response } from "express";
import isAuthenticated from "../middelwares";
const app = express();
dotenv.config();
app.use(
  cors({
    origin: process.env.FRONT,
    credentials: true,
  })
);
app.use(cookieParser());
const port = process.env.PORT;
app.use(express.json());

app.use("/auth", router);
app.use(isAuthenticated);
app.use("/films", filmRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
