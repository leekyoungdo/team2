const express = require("express");
const controller = require("../controller/Cboard");
const router = express.Router();

// 게시판 전체 조회
router.get("/getallboard", controller.getAllBoard);
// 게시판 카테고리 별 조회
router.get("/getboardcategory/:category", controller.getBoardCategory);
// 게시판 하나만 조회
router.get("/getboardid/:board_id", controller.getBoardId);
// 게시판 작성
router.post("/boardsubmit", controller.boardSubmit);
// 게시판 삭제
router.delete("/boarddelete/:board_id", controller.boardDelete);
// 게시판 수정
router.patch("/boardupdate/:board_id", controller.boardUpdate);

module.exports = router;
