const path = require("path");

const express = require("express");
const dotenv = require("dotenv");
const nunjucks = require("nunjucks");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");

const surveyRouter = require("./routes/survey");
const authRouter = require("./routes/auth");
const do_surveyRouter = require("./routes/do_survey");

const { sequelize } = require("./models");
const passportConfig = require("./passport");

dotenv.config();
passportConfig();

const app = express();

app.set("port", process.env.PORT || 8001);
app.set("view engine", "html"); // 뷰엔진을 html로 설정 -> html을 프론트로 사용할 것이라는 뜻
nunjucks.configure("views", {
  express: app,
  watch: true,
});

sequelize
  .sync({ force: false }) // force가 ture라면 데이터베이스를 삭세하고 쓸지
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public"))); 
app.use("/img", express.static(path.join(__dirname, "uploads"))); 
app.use(express.json()); // 응답시 json이라면 받는다.
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/survey", surveyRouter);
app.use("/auth", authRouter);
app.use("/do_survey", do_surveyRouter);

app.use((req, res, next) => {
  res.render("index", {
    title: require("./package.json").name,
    port: app.get("port"),
  });
});

app.use((err, req, res, next) => {
  res.status(500).send(err);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
