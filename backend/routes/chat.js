const express = require("express");
const controller = require("../controller/Cchat");
const router = express.Router();

// 채팅방 생성
router.post("/createroom", controller.createChatRoom);
// 채팅방 입장
router.post("/entryroom", controller.entryChatRoom);
// 채팅방 나가기
router.delete("/exitroom", controller.exitChatRoom);

module.exports = router;
