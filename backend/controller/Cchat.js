const { User, Chat_Room, Chat_Member, Message } = require("../model");

// 채팅방 생성
exports.createChatRoom = async (req, res) => {
  try {
    const { chat_name, chat_category } = req.body;

    const createdChatRoom = await Chat_Room.create({
      chat_name: chat_name,
      chat_category: chat_category,
    });

    await Chat_Member.create({
      user_id: req.session.user,
      chat_id: createdChatRoom.chat_id,
    });

    res.send({ result: true, message: "채팅방이 성공적으로 생성되었습니다." });
  } catch (error) {
    console.error(error);
    res.send({ result: false, message: "서버 오류 발생" });
  }
};

// 채팅방 입장
exports.entryChatRoom = async (req, res) => {
  try {
    const entryChatRoom = await Chat_Room.findOne({
      where: { chat_name: req.body.chat_name },
    });

    await Chat_Member.create({
      user_id: req.session.user,
      chat_id: entryChatRoom.chat_id,
    });

    res.send({
      result: true,
      message: `${req.session.user}님이 입장했습니다.`,
    });
  } catch (error) {
    console.error(error);
    res.send({ result: false, message: "서버 오류 발생" });
  }
};

// 채팅방 나가기
exports.exitChatRoom = async (req, res) => {
  try {
    const chatRoom = await Chat_Room.findOne({
      where: { chat_name: req.body.chat_name },
    });

    await Chat_Member.destroy({
      where: { user_id: req.session.user, chat_id: chatRoom.chat_id },
    });

    res.send({
      result: true,
      message: `${req.session.user}님이 채팅방을 나가셨습니다.`,
    });
  } catch (error) {
    console.error(error);
    res.send({ result: false, message: "서버 오류 발생" });
  }
};

// 채팅방 삭제
exports.deleteChatRoom = async (req, res) => {
  try {
    await Chat_Room.destroy({ where: { chat_name: req.body.chat_name } });

    res.send({
      result: true,
      message: "채팅방이 삭제되었습니다.",
    });
  } catch (error) {
    console.error(error);
    res.send({ result: false, message: "서버 오류 발생" });
  }
};

// 채팅메세지 생성
exports.createMsg = async (req, res) => {
  try {
    const { chat_name, msg_content } = req.body;
    const chatRoom = await Chat_Room.findOne({
      where: { chat_name: chat_name },
    });

    await Message.create({
      user_id: req.session.user,
      chat_id: chatRoom.chat_id,
      msg_content: msg_content,
    });

    res.send({ result: true });
  } catch (error) {
    console.error(error);
    res.send({ result: false, message: "서버 오류 발생" });
  }
};
