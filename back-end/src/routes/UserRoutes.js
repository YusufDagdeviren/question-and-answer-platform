const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/askquestion/:userid", UserController.askQuestion);

router.post("/answerquestion/:userid/:questionid", UserController.answerQuestion);

router.get("/getquestions/:userid", UserController.getQuestions);

router.get("/getanswers/:userid",UserController.getAnswers);

router.post("/upvotequestion/:userid/:answerid", UserController.upvoteAnswer);

module.exports = router;