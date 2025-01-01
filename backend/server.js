import express from "express";
import dotenv from "dotenv";
import connectToDB from "./utils/connectToDB.js";
import userRoutes from "./routes/user.route.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config(app);
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  connectToDB();
  console.log("Server is running on http://localhost:" + PORT);
});
