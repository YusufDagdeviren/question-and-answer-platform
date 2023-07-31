const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/Auth")
const UserController = require("../controllers/UserController");
router.post("/login", UserController.login);

router.post("/logout", authMiddleware, UserController.logout);

router.post("/askquestion/:userid", authMiddleware, UserController.askQuestion);

router.post("/answerquestion/:userid/:questionid", authMiddleware, UserController.answerQuestion);

router.get("/getquestions/:userid", authMiddleware, UserController.getQuestions);

router.get("/getanswers/:userid", authMiddleware, UserController.getAnswers);

router.post("/upvotequestion/:userid/:answerid", authMiddleware, UserController.upvoteAnswer);

module.exports = router;