import express from 'express';
import morgan from "morgan";
import connect from "./db/db.js"
connect();
import userRoutes from './routes/user.routes.js';
import projectRoutes from './routes/project.routes.js'
import aiRoutes from './routes/ai.routes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';



//initialize express
const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // frontend URL
    credentials: true
  }));
app.use(morgan('dev'));
//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/', (req,res) => {
    res.send("Hello Worlds")
});
app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
app.use('/ai', aiRoutes)

export default app;


