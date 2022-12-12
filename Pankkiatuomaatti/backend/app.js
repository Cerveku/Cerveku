var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const jwt = require("jsonwebtoken");

var indexRouter = require("./routes/index");
var loginRouter = require("./routes/login");
var cardRouter = require("./routes/card");
var logRouter = require("./routes/log");
var userRouter = require("./routes/user");
var accountRouter = require("./routes/account");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//suojaamaton
app.use("/login", loginRouter);

//suojattu
app.use(authenticate);
app.use("/", indexRouter);
app.use("/log", logRouter);
app.use("/user", userRouter);
app.use("/account", accountRouter);
app.use("/card", cardRouter);

function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log("token = " + token);
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN, (err, card) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.card = card;

    next();
  });
}

module.exports = app;
