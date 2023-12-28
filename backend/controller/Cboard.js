const { User } = require("../model");
// const { Comment } = require("../model");
const { Board } = require("../model");

// 게시글 작성
exports.boardSubmit = async (req, res) => {
  try {
    const { user_id, title, category, content } = req.body;

    // Board 모델을 사용하여 데이터베이스에 저장
    await Board.create({
      user_id,
      title,
      category,
      content,
      makeboard: Date.now(),
    });

    res.send({ result: true, message: "게시글이 성공적으로 등록되었습니다." });
  } catch (error) {
    console.error(error);
    res.send({ result: false, message: "서버 오류 발생" });
  }
};
// 게시글 삭제
exports.boardDelete = (req, res) => {
  Board.destroy({
    where: {
      board_id: req.params.board_id,
    },
  }).then((result) => {
    if (result === 0) {
      res.send({
        result: false,
        message: "존재하지 않는 게시글이거나 이미 삭제되었습니다.",
      });
    } else {
      res.send({ result: true, message: "게시글이 삭제되었습니다." });
    }
  });
};

//
exports.boardUpdate = async (req, res) => {
  try {
    const board_id = req.params.board_id; // 변경된 부분
    const { title, category, content } = req.body;

    // Board 모델의 update 메소드를 사용하여 데이터베이스를 업데이트
    await Board.update(
      {
        title,
        category,
        content,
      },
      {
        where: {
          board_id: board_id,
        },
      }
    );

    res.send({ result: true, message: "게시글이 성공적으로 수정되었습니다." });
  } catch (error) {
    console.error(error);
    res.send({ result: false, message: "서버 오류 발생" });
  }
};
