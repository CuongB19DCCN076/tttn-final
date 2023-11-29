import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import routes from "./routes/index.js";

const uri = "mongodb+srv://admin:B19dccn076@cluster0.cfwykgu.mongodb.net/?retryWrites=true&w=majority";

dotenv.config()

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())
const port = 3001;

mongoose.connect(uri)
    .then(() => {
        console.log('Connect Db success!')
    })
    .catch((err) => {
        console.log(err)
    })
app.listen(port, () => {
    console.log('Server is running in port: ', + port)
})

routes(app);