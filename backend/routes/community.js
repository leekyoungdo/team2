const express = require("express");
const controller = require("../controller/Ccommunity");
const router = express.Router();

// 게시판의 소모임 카테고리 불러오는 함수
router.get("/getcommunityboard", controller.getCommunityBoard);
// 지역별 소모임 검색
router.get("/searchlocal/:local", controller.searchLocal);
// 소모임 생성
router.post("/createcommunity", controller.createCommunity);
// 소모임 수정
router.patch("/updatecommunity/:community_id", controller.updateCommunity);
// 소모임 삭제
router.delete("/deletecommunity/:community_id", controller.deleteCommunity);

module.exports = router;
