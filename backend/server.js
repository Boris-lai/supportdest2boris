import path from "path";
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
dotenv.config();
import errorHandler from "../backend/middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import ticketRouter from "./routes/ticketRoutes.js";

const PORT = process.env.PORT || 8080;

// 連到資料庫
connectDB();

const app = express();
// 用於在 web 應用程式中通過跨域方式訪問資源
app.use(cors());
// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Support Desk API" });
});

// Routes
app.use("/api/users", userRouter);
app.use("/api/tickets", ticketRouter);

// Serve Frontend
if (process.env.NODE_ENV === "production") {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, "../build")));

  app.get("*", (req, res) =>
    res.sendFile(__dirname, "../", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the Support Desk API" });
  });
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
