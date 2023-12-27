const { User } = require("../model");

// 회원가입
exports.signUp = (req, res) => {
  const data = {
    userid: req.body.userid,
    password: req.body.pw,
  };
  res.send(data);
};
