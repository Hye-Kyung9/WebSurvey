const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Survey, Question, Answer } = require("../models");

const router = express.Router();

router.get("/", isLoggedIn, async (req, res) => {
  try {
    const surveys = await Survey.findAll();
    
    res.render('board' , {
        surveys: surveys
    });
  } catch (error) {
    console.error(error);
  }
});

router.get("/participate",  isLoggedIn, async (req, res) => {
  try {
    const survey = await Survey.findOne({ where: { id : req.query.id } });
    const question = await Question.findOne({ where: { surveyId : survey.id} });
    const answers = await Answer.findAll({ where: { questionId : question.id } });
    console.log(answers[0].answer)

    res.render('participate_survey', {
        survey : survey,
        question : question,
        answers : answers
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;