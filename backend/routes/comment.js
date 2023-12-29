const express = require("express");
const controller = require("../controller/Ccomment");
const router = express.Router();

router.post("/postcomment", controller.postComment);
router.delete("/deletecomment/:comment_id", controller.deleteComment);
router.patch("/editcomment", controller.editComment);

module.exports = router;
