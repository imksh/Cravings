//dotenv
import dotenv from "dotenv";
dotenv.config();

//package import
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db.js";
import authRouter from "./src/routers/auth.route.js";
import publicRouter from "./src/routers/public.route.js";

const app = express();

//middleware

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://10.53.203.71:5173",
      "https://imksh-cravings.netlify.app",
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

//routers

app.use("/api/public", publicRouter);
app.use("/api/auth", authRouter);

//home route
app.get("/", (req, res) => {
  return res.status(200).json({ message: "Server is running" });
});

//not found middleware
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

//error middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

//port
const port = process.env.PORT || 4500;

app.listen(port, () => {
  connectDB();
  console.log("Server is started at: ", port);
});
