import express  from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db"
import fileRoutes from "./routes/files"
import { v2 as cloudinary } from "cloudinary";

const app = express();
dotenv.config();
cloudinary.config({ 
    cloud_name:process.env.Cloud_Name,
    api_key:process.env.API_Key,
    api_secret:process.env.API_Secret
});
connectDB()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/api/files", fileRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`server is listening on Port ${PORT}`));