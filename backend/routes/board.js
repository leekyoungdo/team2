const express = require("express");
const controller = require("../controller/Cboard");
const router = express.Router();

router.post("/boardsubmit", controller.boardSubmit);
router.delete("/boarddelete/:board_id", controller.boardDelete);
router.patch("/boardupdate/:board_id", controller.boardUpdate);
module.exports = router;
