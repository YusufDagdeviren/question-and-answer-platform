const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { authorization } = require("../middlewares/auth");
const { doubleCsrfProtection } = require("../csrf-settings/csrf")

router.post("/login", UserController.login);

router.post("/logout", authorization, doubleCsrfProtection, UserController.logout);

router.post("/askquestion", authorization, doubleCsrfProtection, UserController.askQuestion);

router.post("/answerquestion/:questionid", authorization, doubleCsrfProtection, UserController.answerQuestion);

router.get("/getquestions/:userid", authorization, doubleCsrfProtection, UserController.getQuestions);

router.get("/getanswers/:userid", authorization, doubleCsrfProtection, UserController.getAnswers);

router.post("/upvotequestion/:answerid", authorization, doubleCsrfProtection, UserController.upvoteAnswer);

module.exports = router;