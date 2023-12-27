const express = require("express");
const session = require("express-session");
const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "secret key", // 비밀키를 설정합니다.
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 60 * 1000, // 세션 유지 시간을 한 시간으로 설정합니다.
    },
  })
);
const userRouter = require("./routes/user");
app.use("/user", userRouter);

app.listen(PORT, function () {
  console.log(`Sever Open: ${PORT}`);
});
