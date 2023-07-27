const Answer = require("../models/answer");
const Question = require("../models/question");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateToken } = require("../csrf-settings/csrf")
const createAnswer = function (res, status, content) {
    res.status(status).json(content);
}
const login = async function (req, res) {
    const user_email = req.body.user_email;
    const password = req.body.password
    if (!password || !user_email) {
        createAnswer(res, 400, { "message": "Missing required information" });
    } else {
        try {
            const user = await User.findOne({
                where: {
                    user_email: user_email
                }
            });

            if (!user) {
                createAnswer(res, 404, { "message": "Mail Not Found" });
            } else {
                const match = await bcrypt.compare(password, user.dataValues.password);
                if (match) {
                    req.session.isAuth = 1;
                    req.session.authority = user.user_authority;
                    req.session.userId = user.id;
                    const csrfToken = generateToken(res,req);
                    createAnswer(res, 200, { "token": csrfToken });
                } else {
                    createAnswer(res, 401, { "message": "Wrong Password" });
                }
            }

        } catch (error) {
            createAnswer(res, 500, { "message": "something went wrong" });
        }
    }
}
const logout = async function (req, res) {
    try {
        await req.session.destroy();
        return createAnswer(res, 200, { "message": "logout success" });

    } catch (error) {
        createAnswer(res,400,error);
    }
}
const askQuestion = async function (req, res) {
    const userid = req.session.userId;
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
            const csrfToken = generateToken(res,req);
            createAnswer(res, 200, { "token": csrfToken })
        } else {
            createAnswer(res, 404, { "message": "user is not found" })
        }
    } catch (error) {
        createAnswer(res, 400, { "message": error })
    }

}
const answerQuestion = async function (req, res) {
    const userid = req.session.userId;
    const questionid = req.params.questionid;
    try {
        const user = await User.findByPk(userid);
        if (user) {
            const question = await Question.findByPk(questionid);
            if (question) {
                if (question.dataValues.userId != userid) {
                    await Answer.create({
                        answer_text: req.body.answer_text,
                        answer_image: req.body.answer_image,
                        userId: userid,
                        questionId: questionid
                    })
                    const csrfToken = generateToken(res,req);
                    createAnswer(res, 200, { "token": csrfToken })
                } else {
                    createAnswer(res, 400, { "message": "the questioner cannot answer" });
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
            attributes: ["id", "user_name", "user_email", "number_of_answer"],
            include: Question,
            where: {
                id: userid
            }
        })
        if (user) {
            createAnswer(res, 200, user)
        } else {
            createAnswer(res, 404, { "message": "user is not found" });
        }
    } catch (error) {
        createAnswer(res, 400, { "message": error });
    }

}
const getAnswers = async function (req, res) {
    const userid = req.params.userid;
    try {
        const user = await User.findAll({
            attributes: ["id", "user_name", "user_email", "number_of_answer"],
            include: Answer,
            where: {
                id: userid
            }
        })
        if (user) {
            createAnswer(res, 200, user)
        } else {
            createAnswer(res, 404, { "message": "user is not found" });
        }
    } catch (error) {
        createAnswer(res, 400, { "message": error });
    }
}
const upvoteAnswer = async function (req, res) {
    const userid = req.session.userId;
    const answerid = req.params.answerid;
    try {
        const answer = await Answer.findByPk(answerid);
        if (answer) {
            const question = await answer.getQuestion();
            if (question.dataValues.userId == userid) {
                answer.approval = true;
                await answer.save();
                const csrfToken = generateToken(res,req);
                createAnswer(res, 201, { "token": csrfToken })
            } else {
                createAnswer(res, 400, { "message": "no authorization" });
            }
        } else {
            createAnswer(res, 404, { "message": "no answer found" })
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
    login,
    logout
}