module.exports = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
    console.log("socket id", socket.id);

    // 채팅방 생성
    socket.on("createChat", (res) => {
      console.log("client data", res);
      socket.join(res.chat_name);
      io.to(res.chat_name).emit("notice", {
        msg: `${res.chat_name}이 생성되었습니다!`,
      });
    });
  });
};
