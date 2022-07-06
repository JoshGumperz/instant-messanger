const io = require("socket.io")(8000, {
    cors:{
        origin:"http://localhost:3000"
    },
});

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

    socket.on('sendMessage', ({senderId, receiverId, conversationId, text}) => {
        const user = getUser(receiverId);
        console.log('receiverId:', receiverId)
        console.log(user)
        user && io.to(user.socketId).emit('getMessage', { 
            senderId,
            conversationId,
            text
        });
    });

    socket.on('disconnect', () => {
        removeUser(socket.id)
        io.emit("getUsers", users);
    });
});