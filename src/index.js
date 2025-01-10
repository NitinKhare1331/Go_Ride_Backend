import express from "express";
import { PORT } from "./config/serverConfig.js";
import  cors from "cors";
import { createServer } from "http";
import connectDB from "./config/dbConfig.js";
import userRoutes from './routes/userRoute.js';
import cookieParser from "cookie-parser";


const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/ping', (req, res) => {
    res.json("pong");
});

app.use('/users', userRoutes);

server.listen(PORT, async () => {
    console.log(`Server is running on PORT ${PORT}`);
    connectDB();
});