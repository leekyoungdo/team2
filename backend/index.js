const express = require("express");
const app = express();
const PORT = 8000;

const userRouter = require("./routes/user");
app.use("/user", userRouter);

app.listen(PORT, function () {
  console.log(`Sever Open: ${PORT}`);
});
