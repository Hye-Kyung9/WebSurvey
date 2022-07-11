const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const User = require("../models/user");

const router = express.Router();

router.post("/join", isNotLoggedIn, async (req, res, next) => {
  const { email, password, nick } = req.body;

  const pw = await bcrypt.hash(password, 12);

  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect("/join?error=exist");
    }
    await User.create({ email, password: pw, nick });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
  const { email, password } = req.body;
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }

    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      //req.session.name = email; // 세션에 이메일 저장
      return res.redirect("/");
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/auth");
});

module.exports = router;
