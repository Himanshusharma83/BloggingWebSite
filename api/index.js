import express from "express";
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from "./routes/user.route.js";

dotenv.config()

mongoose.connect(process.env.MONGO)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log('not connected '));

const app = express()

app.listen(3000, () => {
  console.log('server is running on 3000 port')
});

app.use('/api/user',userRoutes)
