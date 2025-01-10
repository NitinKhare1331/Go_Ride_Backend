import express from "express";
import { PORT } from "./config/serverConfig.js";

const app = express();

app.get('/ping', (req, res) => {
    res.json("pong");
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});