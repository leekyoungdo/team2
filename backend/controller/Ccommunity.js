const { User } = require("../model");
const { Board } = require("../model");
const { Community } = require("../model");

// 게시판의 소모임 카테고리 불러오기
exports.getCommunityBoard = async (req, res) => {
  try {
    const boards = await Board.findAll({
      where: {
        category: "소모임",
      },
    });

    if (!boards) {
      return res.send({ result: false, message: "게시판이 없습니다." });
    }

    res.status(200).send({ boards });
  } catch (error) {
    console.error("Error getting boards:", error);
    res.send({ result: false, message: "서버 오류 발생" });
  }
};

// 지역별 소모임 검색
exports.searchLocal = async (req, res) => {
  const { local } = req.params;

  try {
    const communities = await Community.findAll({
      where: {
        community_local: local,
      },
    });

    if (!communities.length) {
      return res.send({
        result: false,
        message: "해당 지역의 소모임이 없습니다.",
      });
    }

    res.send({ communities });
  } catch (error) {
    console.error("Error searching communities:", error);
    res.send({ result: false, message: "서버 오류 발생" });
  }
};

// 소모임 생성
exports.createCommunity = async (req, res) => {
  try {
    const { community_name, community_local, introduce } = req.body;
    const newCommunity = await Community.create({
      community_name: community_name,
      community_local: community_local,
      introduce: introduce,
    });

    res.send({ result: true, message: "소모임이 성공적으로 생성되었습니다." });
  } catch (error) {
    console.error("Error creating community:", error);
    res.send({ result: false, message: "서버 오류 발생" });
  }
};

// 소모임 수정
exports.updateCommunity = async (req, res) => {
  try {
    const { community_name, community_local, introduce } = req.body;
    const community_id = req.params.community_id;

    await Community.update(
      {
        community_name: community_name,
        community_local: community_local,
        introduce: introduce,
      },
      {
        where: { community_id: community_id },
      }
    );

    res.send({ result: true, message: "소모임이 성공적으로 수정되었습니다." });
  } catch (error) {
    console.error("Error updating community:", error);
    res.send({ result: false, message: "서버 오류 발생" });
  }
};

// 소모임 삭제
exports.deleteCommunity = async (req, res) => {
  try {
    const community_id = req.params.community_id;

    await Community.destroy({
      where: { community_id: community_id },
    });

    res.send({ result: true, message: "소모임이 성공적으로 삭제되었습니다." });
  } catch (error) {
    console.error("Error deleting community:", error);
    res.send({ result: false, message: "서버 오류 발생" });
  }
};
