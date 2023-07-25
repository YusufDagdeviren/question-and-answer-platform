const Answer = require("../models/answer");
const Question = require("../models/question");
const User = require("../models/user")
const createAnswer = function (res, status, content) {
    res.status(status).json(content);
}
const askQuestion = async function (req, res) {
    const userid = req.params.userid;
    try {
        const user = await User.findByPk(userid);
        if (user) {
            const question_title = req.body.question_title;
            const question_text = req.body.question_text;
            const question_image = req.body.question_image;//şimdilik bu şekilde kalsın fs module ile çekilecek burası
            await Question.create({
                question_title: question_title,
                question_text: question_text,
                question_image: question_image,
                userId: userid
            })
            createAnswer(res, 200, { "message": "question created" })
        } else {
            createAnswer(res, 404, { "message": "user is not found" })
        }
    } catch (error) {
        createAnswer(res, 400, { "message": error })
    }

}
const answerQuestion = async function (req, res) {
    const userid = req.params.userid;
    const questionid = req.params.questionid;
    try {
        const user = await User.findByPk(userid);
        if (user) {
            const question = await Question.findByPk(questionid);
            if (question) {
                if(question.dataValues.userId != userid) {
                    await Answer.create({
                        answer_text: req.body.answer_text,
                        answer_image: req.body.answer_image,
                        userId: userid,
                        questionId: questionid
                    })
                    createAnswer(res, 200, { "message": "question answered" });
                } else {
                    createAnswer(res,400,{"message":"the questioner cannot answer"});
                }
            } else {
                createAnswer(res, 404, { "message": "question is not found" });
            }
        } else {
            createAnswer(res, 404, { "message": "user is not found" });
        }
    } catch (error) {
        createAnswer(res, 400, { "message": error });
    }
}

const getQuestions = async function (req, res) {
    const userid = req.params.userid;
    try {
        const user = await User.findAll({
            attributes: ["id","user_name","user_email","number_of_answer"],
            include:Question,
            where:{
                id: userid
            }
        })
        if(user){
            createAnswer(res,200,user)
        }else{
            createAnswer(res, 404, { "message": "user is not found" });
        }
    } catch (error) {
        createAnswer(res, 400, { "message": error });
    }
    
}
const getAnswers = async function(req, res){
    const userid = req.params.userid;
    try {
        const user = await User.findAll({
            attributes: ["id","user_name","user_email","number_of_answer"],
            include:Answer,
            where:{
                id: userid
            }
        })
        if(user){
            createAnswer(res,200,user)
        }else{
            createAnswer(res, 404, { "message": "user is not found" });
        }
    } catch (error) {
        createAnswer(res, 400, { "message": error });
    }
}
const upvoteAnswer = async function (req, res) {
    const userid = req.params.userid;
    const answerid = req.params.answerid;
    try {
        const answer = await Answer.findByPk(answerid);
        if(answer){
            const question = await answer.getQuestion();
            if(question.dataValues.userId == userid){
                answer.approval = true;
                await answer.save();
                createAnswer(res,201,{"message":"answer confirmed"});
            }else{
                createAnswer(res,400,{"message":"no authorization"});
            }
        }else{
            createAnswer(res,404,{"message":"no answer found"})
        }
    } catch (error) {
        createAnswer(res, 400, { "message": error });
    }
}
module.exports = {
    askQuestion,
    answerQuestion,
    getQuestions,
    getAnswers,
    upvoteAnswer,
}