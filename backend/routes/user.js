const express = require("express");
const controller = require("../controller/Cuser");
const router = express.Router();

// 회원가입
router.post("/signup", controller.signUp);

module.exports = router;
