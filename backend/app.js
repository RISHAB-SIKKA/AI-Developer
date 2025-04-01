import express from 'express';
import morgan from "morgan";
import connect from "./db/db.js"
connect();
import userRoutes from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';


//initialize express
const app = express();
app.use(cors());
app.use(morgan('dev'));
//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/', (req,res) => {
    res.send("Hello Worlds")
});
app.use('/users', userRoutes);

export default app;


