const io = require("socket.io")(8000, {
    cors:{
        origin:"http://localhost:3000"
    },
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId = userId) &&
        users.push({ userId, socketId });
};

io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("userConnect", userId=>{
        addUser(userId, socket.id);
        console.log('users:', users)
        console.log('users.legnth:', users.length)
        io.emit("getUsers", users);
    });
});