require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./Routes/userRoute");
const connectDB = require("./database/connection");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
const port = process.env.PORTd || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`server started in port = http://localhost:${port}`)
    );
  } catch (err) {
    console.log(err);
  }
};
start();
