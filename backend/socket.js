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
      socket.join(res.chat_title);
      io.to(res.chat_title).emit("notice", {
        msg: `${res.chat_title}방이 생성되었습니다!`,
      });
    });
  });
};
