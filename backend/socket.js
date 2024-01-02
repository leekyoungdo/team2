module.exports = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
    console.log("socket id", socket.id);

    // 채팅방 입장
    socket.on("entry", (res) => {
      console.log("채팅방 입장", res);
      const { chat_name, chat_category, nickname } = res;
      socket.join(chat_name);
      io.to(chat_name).emit("notice", {
        msg: `${nickname}님이 입장하셨습니다.`,
      });
    });
  });
};
