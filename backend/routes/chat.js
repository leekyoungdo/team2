const express = require("express");
const controller = require("../controller/Cchat");
const router = express.Router();

// 채팅방 생성
router.post("/createroom", controller.createChatRoom);

module.exports = router;
