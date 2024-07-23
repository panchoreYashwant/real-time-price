import express from "express";
import mongoose from "mongoose";
import stockRoutes from "./routes/stock";
import cors from "cors";
import "./cronJobs";

const app = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(
    "mongodb://localhost:27017/stocks"
    //    {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

app.use(cors());
app.use("/api/stocks", stockRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
