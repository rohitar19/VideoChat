const express = require('express');
const bodyParser = require('body-parser');
const {Server, Socket} = require('socket.io')

const io=new Server({
    cors:true,
});
const app= express();

app.use(bodyParser.json());


 const emailToSocketMapping = new Map();


io.on("connection" , (socket) => {
      socket.on("connection" , (data) =>{
        console.log("New Connection");
        const {roomId , emailId } = data;
        console.log("User" , emailId , "Joined Room " , roomId);
        emailToSocketMapping.set(emailId , socket.id);
        socket.join(roomId);
        //to informed all 
        socket.broadcast.to(roomId).emit("user-joined" , {emailId});

      });
})

app.listen(8000 , () =>console.log("Http server running at PORT 8000"));
io.listen(8001);