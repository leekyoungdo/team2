const { User } = require("../model");
const crypto = require("crypto");

// 회원가입
exports.signUp = (req, res) => {
  const salt = crypto.randomBytes(16).toString("base64");
  const iterations = 100;
  const keylen = 64;
  const digest = "sha512";
  const hashedPassword = crypto
    .pbkdf2Sync(req.body.password, salt, iterations, keylen, digest)
    .toString("base64");
  const data = {
    user_id: req.body.user_id,
    password: hashedPassword,
    salt: salt,
    nickname: req.body.nickname,
    email: req.body.email,
  };
  User.create(data)
    .then((result) => {
      console.log("회원가입 성공");
      res.send({ result: true, message: "회원가입에 성공하였습니다." });
    })
    .catch((error) => {
      console.log("회원가입 실패", error);
      res.send({ result: false, message: "회원가입에 실패하였습니다." });
    });
};

// 로그인
exports.signIn = async (req, res) => {
  const user = await User.findOne({ where: { user_id: req.body.user_id } });

  if (!user) {
    return res.send({ result: false, message: "사용자를 찾을 수 없습니다." });
  }

  const iterations = 100;
  const keylen = 64;
  const digest = "sha512";
  const hashedPassword = crypto
    .pbkdf2Sync(req.body.password, user.salt, iterations, keylen, digest)
    .toString("base64");
  if (user.password === hashedPassword) {
    req.session.user = user; // 세션에 사용자 정보 저장
    req.session.isAuthenticated = true; // 로그인 상태를 true로 설정
    console.log("로그인성공");
    res.send({ result: true });
  } else {
    console.log("로그인실패");
    res.send({ result: false, message: "비밀번호가 일치하지 않습니다." });
  }
};

// 아이디 중복확인
exports.checkId = (req, res) => {
  User.findAll({
    where: {
      user_id: req.body.user_id,
    },
  }).then((result) => {
    if (result.length > 0) {
      // 이미 사용 중인 아이디가 있음
      res.send({ duplicate: true });
    } else {
      // 사용 가능한 아이디
      res.send({ duplicate: false });
    }
  });
};
// 닉네임 중복확인
exports.checkNickname = (req, res) => {
  User.findAll({
    where: {
      nickname: req.body.nickname,
    },
  }).then((result) => {
    if (result.length > 0) {
      // 이미 사용 중인 닉네임이 있음
      res.send({ duplicate: true });
    } else {
      // 사용 가능한 닉네임
      res.send({ duplicate: false });
    }
  });
};
// 아이디 찾기
exports.FindId = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((result) => {
    if (result) {
      // 해당 이메일로 등록된 아이디가 있으면 userid를 반환
      res.send({ user_id: result.user_id });
    } else {
      // 해당 이메일로 등록된 아이디가 없으면 userid: null
      res.send({ user_id: null });
    }
  });
};

exports.updatePassword = async (req, res) => {
  const { user_id, changePassword } = req.body;
  const user = await User.findOne({ where: { user_id: user_id } });

  if (!user) {
    return res.send({ result: false, message: "유저를 찾을 수 없습니다." });
  }

  const salt = crypto.randomBytes(16).toString("base64");
  const iterations = 100;
  const keylen = 64;
  const digest = "sha512";
  const hashedPassword = crypto
    .pbkdf2Sync(changePassword, salt, iterations, keylen, digest)
    .toString("base64");
  // 변경된 정보 저장
  user.password = hashedPassword;
  user.salt = salt;
  await user.save();

  res.send({
    result: true,
    message: "비밀번호가 성공적으로 변경되었습니다.",
    isAuthenticated: req.session.isAuthenticated,
  });
};
// 닉네임 변경
exports.updateNickname = async (req, res) => {
  const { user_id } = req.session.user;
  const { nickname } = req.body;
  const data = { user_id: user_id, nickname: nickname };

  await User.update(data, { where: { user_id: user_id } });
  const user = await User.findOne({ where: { user_id: user_id } });

  if (user) {
    user.nickname = nickname;
    await user.save();

    // 세션에 있는 사용자 정보도 업데이트
    req.session.user = user.dataValues;
    req.session.save((err) => {
      if (err) {
        // 에러 처리
        res.send({ result: false, message: "세션 업데이트에 실패하였습니다." });
      } else {
        console.log(req.session.user);
        res.send({
          result: true,
          message: "닉네임이 성공적으로 수정되었습니다.",
        });
      }
    });
  } else {
    res.send({ result: false, message: "유저를 찾을 수 없습니다." });
  }
};
