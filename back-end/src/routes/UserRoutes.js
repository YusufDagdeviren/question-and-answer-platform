const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { authorization } = require("../middlewares/auth");


router.post("/login", UserController.login);

router.post("/logout", authorization, UserController.logout);

router.post("/askquestion", authorization, UserController.askQuestion);

router.post("/answerquestion/:questionid", authorization, UserController.answerQuestion);

router.get("/getquestions/:userid", authorization, UserController.getQuestions);

router.get("/getanswers/:userid", authorization, UserController.getAnswers);

router.post("/upvotequestion/:answerid", authorization, UserController.upvoteAnswer);

module.exports = router;