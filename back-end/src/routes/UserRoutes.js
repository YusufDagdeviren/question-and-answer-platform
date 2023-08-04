const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/Auth")
const UserController = require("../controllers/UserController");
router.post("/login", UserController.login);

router.post("/logout", authMiddleware, UserController.logout);

router.post("/createaccesstoken", authMiddleware, UserController.createAccessToken);

router.post("/askquestion", authMiddleware, UserController.askQuestion);

router.post("/answerquestion/:questionid", authMiddleware, UserController.answerQuestion);

router.get("/getquestions/:userid", authMiddleware, UserController.getQuestions);

router.get("/getmyquestions", authMiddleware, UserController.getMyQuestions);

router.get("/getanswers/:userid", authMiddleware, UserController.getAnswers);

router.get("/getmyanswers", authMiddleware, UserController.getMyAnswers);

router.post("/upvotequestion/:answerid", authMiddleware, UserController.upvoteAnswer);

module.exports = router;