const express = require("express");
const controller = require("../controller/Ccomment");
const router = express.Router();

// 댓글 전체 조회
router.get("/getallcomment/:board_id", controller.getAllComment);
// 댓글 하나 조회
router.get("/getcomment/:comment_id", controller.getComment);
// 댓글 작성
router.post("/postcomment", controller.postComment);
// 댓글 삭제
router.delete("/deletecomment/:comment_id", controller.deleteComment);
// 댓글 수정
router.patch("/editcomment", controller.editComment);

module.exports = router;
