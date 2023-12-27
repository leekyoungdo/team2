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
    userid: req.body.userid,
    password: hashedPassword,
    salt: salt,
    nickname: req.body.nickname,
    email: req.body.email,
  };
  User.create({
    user_id: req.body.userid,
    password: hashedPassword,
    salt: salt,
    nickname: req.body.nickname,
    email: req.body.email,
  }).then((result) => {
    console.log("user create 성공");
    res.send({ ...data, result: true });
  });
};
// 로그인
exports.signIn = async (req, res) => {
  const user = await User.findOne({ where: { user_id: req.body.user_id } });

  if (!user) {
    return res.send({ result: false });
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
    console.log("로그인성공"); // 세션 상태 출력
    res.send({ session: req.session.user });
  } else {
    console.log("로그인실패");
    res.send({ result: false });
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
