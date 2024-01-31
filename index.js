import express from "express";
const app = express();
import mongoose from "mongoose";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(9900, () => {
      console.log(`App listening to port :9900`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

//middleware

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.get("/", (req, res) => {
  res.send("Welcome to homepage!");
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
// app.get("/users", (req, res) => {
//   res.send("Welcome to users page!");
// });
