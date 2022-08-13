const express = require("express");
const app = express();
const http = require('http');
const { Server } = require('socket.io')
const cors = require('cors')

app.use(cors());
const server = http.createServer(app);

const io  = new Server(server, {
    cors: {
        origin: 'https://jg-instant-messenger.herokuapp.com/'
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

server.listen(8000, () => {
    console.log('socket server is runninng')
})