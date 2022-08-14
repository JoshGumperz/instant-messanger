const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require('path');
const app = express();
const routes = require('./routes/index')
const http = require('http');
const { Server } = require('socket.io')
const cors = require('cors')

app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
dotenv.config();
app.use('/api', routes)
const PORT = process.env.PORT || 3001
const server = http.createServer(app);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => { 
        console.log("DB Connection Successful") 
    })
    .catch((error) => { 
        console.log(error) 
    })

const io  = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
})

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

const getUser = (userId) => {
    return users.find(user => user.userId === userId)
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
};

io.on("connection", (socket) => {
    socket.on("userConnect", userId=>{
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    socket.on('sendMessage', ({senderId, receiverId, messageId, conversationId, text}) => {
        const user = getUser(receiverId);
        user && io.to(user.socketId).emit('getMessage', { 
            senderId,
            messageId,
            conversationId,
            text
        });
    });

    socket.on('editMessage', ({senderId, receiverId, messageId, text}) => {
        const user = getUser(receiverId);
        user && io.to(user.socketId).emit('messageEdited', { 
            senderId,
            messageId,
            text
        });
    });

    socket.on('deleteMessage', ({senderId, receiverId, messageId}) => {
        const user = getUser(receiverId);
        user && io.to(user.socketId).emit('messageDeleted', { 
            senderId,
            messageId,
        });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected')
        removeUser(socket.id)
        io.emit("userDisconnected", users);
    });
});

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

server.listen(PORT, () => {
    console.log('socket server is runninng')
})