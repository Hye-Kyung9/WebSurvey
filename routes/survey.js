const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Survey, Question, Answer } = require("../models");

const router = express.Router();

router.get('/', isLoggedIn, (req, res) => {
  try {
    res.render('register_survey', {
      numbers: [1]
    }); 
  } catch (error) {
    console.log(error)
  }
});

router.post("/register", async (req, res) => {
  // console.log(res.locals.user);
  try {
    const survey = await Survey.create({
      userId: req.user.email,
      title: req.body.title
    });

    [1].forEach(async v => {
      const question = await Question.create({
        surveyId: survey.id,
        title: req.body[`question${v}`]
      });

      [1, 2, 3].forEach(async e => {
        await Answer.create({
          userId:req.user.email,
          questionId: question.id,
          answer: req.body[`answer${v}_${e}`]
        });
      });
    });

    return res.redirect("/");
  } catch (error) {
    console.error(error);
  }
});

router.get("/get_survey/:id", async (req, res) => {
  try {
    const surveys = await Survey.findAll({ where: { userId: req.params.id } });
    console.log(surveys);
    result = {
      ok: true,
      data: surveys,
    };
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;