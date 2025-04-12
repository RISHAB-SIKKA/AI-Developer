import 'dotenv/config.js';
import http from 'http';
import app from './app.js';
const port = process.env.PORT || 3000;
import {Server} from 'socket.io';
import { socketMiddleware } from './middleware/socket.middleware.js';
import { generateResult } from './services/ai.service.js';


const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin: '*',
    }
});

socketMiddleware(io);

io.on('connection', socket => {
    socket.roomId = socket.project._id.toString();
    socket.join(socket.roomId);

    socket.on('project-message', async data => {
        const message  =data.message;
        
        const aiIsPresentInMessage = message.includes('@ai');
        socket.broadcast.to(socket.roomId).emit('project-message', data);

        if(aiIsPresentInMessage){
           const prompt = message.replace('@ai', '');
           const result = await generateResult(prompt);

           io.to(socket.roomId).emit('project-message', {
            message: result,   
            sender:{
                _id:'ai',
                email: 'AI'
            }
           })
        }

    })
    socket.on('disconnect', () => { 
        socket.leave(socket.roomId)
    });
});

server.listen(port, () =>{
    console.log(`Server is listening at ${port}` );
})
