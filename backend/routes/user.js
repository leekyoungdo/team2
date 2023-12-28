const express = require("express");
const controller = require("../controller/Cuser");
const router = express.Router();

// 회원가입
router.post("/signup", controller.signUp);
// 로그인
router.post("/signin", controller.signIn);
// 아이디 중복확인
router.post("/checkid", controller.checkId);
// 닉네임 중복확인
router.post("/checknickname", controller.checkNickname);
// 아이디 찾기
router.post("/findid", controller.FindId);
// 비밀번호 변경
router.post("/updatepassword", controller.updatePassword);

module.exports = router;
