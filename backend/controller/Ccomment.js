const { User } = require("../model");
const { Comment } = require("../model");
const { Board } = require("../model");

// 댓글 전체 조회
exports.getAllComment = (req, res) => {
  Comment.findAll({
    where: {
      board_id: req.params.board_id,
    },
    // 필요 없으면 삭제해도됨
    include: [
      {
        model: User,
        attributes: ["nickname"],
      },
    ],
  })
    .then((comments) => {
      res.send({ result: true, comments });
    })
    .catch((error) => {
      console.error("Error getting all comments:", error);
      res.send({ result: false, message: "댓글 조회 실패" });
    });
};

// 댓글 하나 조회
exports.getComment = (req, res) => {
  Comment.findOne({
    where: {
      comment_id: req.params.comment_id,
    },
    include: [
      {
        model: User,
        attributes: ["nickname"],
      },
    ],
  })
    .then((comment) => {
      if (comment) {
        res.send({ result: true, comment });
      } else {
        res.send({ result: false, message: "해당 댓글이 존재하지 않습니다." });
      }
    })
    .catch((error) => {
      console.error("Error getting comment:", error);
      res.send({ result: false, message: "댓글 조회 실패" });
    });
};

// 댓글 작성
exports.postComment = async (req, res) => {
  if (!req.body.user_id) {
    res.send({ error: "로그인 후 이용 가능합니다." });
    return;
  }

  const data = {
    board_id: req.body.board_id,
    user_id: req.body.user_id,
    comment_content: req.body.comment_content,
    makecomment: Date.now(),
  };

  try {
    await Comment.create(data);
    res.send({ result: true, message: "댓글 작성 성공" });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.send({ result: false, message: "댓글 작성 실패" });
  }
};

// 댓글 삭제
exports.deleteComment = (req, res) => {
  Comment.destroy({
    where: {
      comment_id: req.params.comment_id,
    },
  }).then((result) => {
    if (result === 0) {
      res.send({
        result: false,
        message: "존재하지 않는 댓글이거나 이미 삭제되었습니다.",
      });
    } else {
      res.send({ result: true, message: "댓글이 삭제되었습니다." });
    }
  });
};

// 댓글 수정
exports.editComment = (req, res) => {
  const data = {
    comment_content: req.body.comment_content,
  };

  Comment.update(data, {
    where: {
      comment_id: req.body.comment_id,
    },
  })
    .then((result) => {
      if (result[0] > 0) {
        res.send({ result: true, message: "댓글이 수정되었습니다." });
      } else {
        res.send({ result: false, message: "댓글 수정에 실패했습니다." });
      }
    })
    .catch((error) => {
      console.error("Error updating comment:", error);
      res.send({ error: "서버 에러" });
    });
};
