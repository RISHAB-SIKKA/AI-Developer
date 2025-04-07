import 'dotenv/config.js';
import http from 'http';
import app from './app.js';
const port = process.env.PORT || 3000;
import {Server} from 'socket.io';
import { socketMiddleware } from './middleware/socket.middleware.js';


const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin: '*',
    }
});

socketMiddleware(io);

io.on('connection', socket => {
    socket.roomId = socket.project._id.toString();
    console.log('A user connected');
    
    socket.join(socket.roomId);

    socket.on('project-message', data => {
        socket.broadcast.to(socket.roomId).emit('project-message', data);
        console.log(data);
    })
    // Handle socket events here    
    // socket.on('event', data => { /* … */ });
    socket.on('disconnect', () => { 
        socket.leave(socket.roomId)
    });
});

server.listen(port, () =>{
    console.log(`Server is listening at ${port}` );
})
