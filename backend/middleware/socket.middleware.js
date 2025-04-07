import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import projectModel from '../models/project.model.js';

export const socketMiddleware = (io) => {

    io.use( async (socket, next) => {
        try{
            const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[1];

            const projectId = socket.handshake.query.projectId;
            if(!mongoose.Types.ObjectId.isValid(projectId)){
                return next(new Error('Invalid project id'));
            }

            socket.project = await projectModel.findById(projectId)


            if(!token){
                return next(new Error('Unauthorized User'));
            }
    
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            if(!decoded){
                return next(new Error('Unauthorized User'));
            }
    
            socket.user = decoded;
            next();
    
        }catch(err){
            console.log(err)
            next(new Error('Authentication error'));
        }
    })

}