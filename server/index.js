//package import
import "./src/config/env.js";
import { createServer } from "http";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import connectDB from "./src/config/db.js";
import initializeSocket from "./src/config/socket.js";
import cloudinary from "./src/config/cloudinary.js";
import authRouter from "./src/routers/auth.route.js";
import publicRouter from "./src/routers/public.route.js";
import userRouter from "./src/routers/user.route.js";
import PartnerRouter from "./src/routers/partner.route.js";
import customerRouter from "./src/routers/customer.route.js";

const app = express();
const server = createServer(app);

//middleware

app.use(
  cors({
    origin: ["http://localhost:5173", "http://10.53.203.71:5173","https://cravingsfood.netlify.app"],
    credentials: true,
  }),
);
app.use(helmet());
app.use(compression());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
});
app.use("/api", limiter);

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

//routers

app.use("/api/public", publicRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/partner", PartnerRouter);
app.use("/api/customer", customerRouter);

//home route
app.get("/api", (req, res) => {
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

initializeSocket(server);

server.listen(port, async () => {
  console.log("Server is started at: ", port);
  connectDB();
  // try {
  //   const res = await cloudinary.api.ping();
  //   console.log("Cloudinary api is working ", res);
  // } catch (error) {
  //   console.error("Error in connecting cloudinary api", error);
  // }
});
