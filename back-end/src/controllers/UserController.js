const Answer = require("../models/answer");
const Question = require("../models/question");
const User = require("../models/user");
const passport = require("passport")
const { client } = require("../clients/redis");


const {
    generateAccessToken,
    generateRefreshToken
} = require("../functions/token")
// const expiredAt = moment().add(ms(process.env.ACCESS_TOKEN_LIFE), 'ms').valueOf(); //15 dakikada bir jeton üret

const createAnswer = function (res, status, content) {
    res.status(status).json(content);
}
const login = async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        createAnswer(res, 400, { "error": "email and password required" });
        return;
    }
    else {
        passport.authenticate("local", async (error, user, info) => {
            let tokenObj, refresh_token;
            if (error) {
                createAnswer(res, 404, error)
                return;
            }
            if (user) {
                if (await client.get(user.dataValues.id)) {
                    createAnswer(res, 401, { "error": "the user is logged into the system" })
                    return;
                } else {
                    tokenObj = generateAccessToken(user.dataValues)
                    refresh_token = generateRefreshToken(user.dataValues.id)
                    await client.set(user.dataValues.id, refresh_token)
                    const unixTimestamp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 15; //15 day
                    client.expireAt(user.dataValues.id, new Date(unixTimestamp * 1000));
                    createAnswer(res, 200, {
                        "token": tokenObj.token,
                        "refreshToken": refresh_token,
                        "xsrf-token": tokenObj.xsrfToken,
                        "expiredAt": tokenObj.expiredAt
                    })
                }
            } else {
                createAnswer(res, 401, info)
                return;
            }
        })(req, res);
    }
}

const createAccessToken = async function(req,res){
    const user = req.user;
    await client.set(`bl_${req.headers["authorization"]}`, req.user.id);
    const unixTimestamp = Math.floor(Date.now() / 1000) + 60 * 15; //15 minute
    client.expireAt(`bl_${req.headers["authorization"]}`, new Date(unixTimestamp * 1000));
    const tokenObj = generateAccessToken(user);
    createAnswer(res,201,{
        "token": tokenObj.token,
        "xsrf-token": tokenObj.xsrfToken,
        "expiredAt": tokenObj.expiredAt
    });
}

const logout = async function (req, res) {
    await client.del(req.user.id);
    await client.set(`bl_${req.headers["authorization"]}`, req.user.id);
    const unixTimestamp = Math.floor(Date.now() / 1000) + 60 * 15; //15 minute
    client.expireAt(`bl_${req.headers["authorization"]}`, new Date(unixTimestamp * 1000));
    createAnswer(res, 200, { "message": "logout successful" });
}

const askQuestion = async function (req, res) {
    const userid = req.user.id;
    try {
        const user = await User.findByPk(userid);
        if (user) {
            const question_title = req.body.question_title;
            const question_text = req.body.question_text;
            const question_image = req.body.question_image;
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
    const userid = req.user.id;
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
                    createAnswer(res, 200, { "message": "question answered" });
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

const getMyQuestions = async function (req, res) {
    const userid = req.user.id;
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

const getMyAnswers = async function (req, res) {
    const userid = req.user.id;
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
    const userid = req.user.id;
    const answerid = req.params.answerid;
    try {
        const answer = await Answer.findByPk(answerid);
        if (answer) {
            const question = await answer.getQuestion();
            if (question.dataValues.userId == userid) {
                answer.approval = true;
                await answer.save();
                createAnswer(res, 201, { "message": "answer confirmed" });
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
    login,
    logout,
    askQuestion,
    answerQuestion,
    getQuestions,
    getAnswers,
    upvoteAnswer,
    getMyAnswers,
    getMyQuestions,
    createAccessToken
}