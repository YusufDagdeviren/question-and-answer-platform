const Question = require("../models/question");
const User = require("../models/user");
const Answer = require("../models/answer");

async function data_load(){
    const count = await User.count();
    if(count == 0){
        await User.create({
            user_name: "Test",
            user_email:"test@gmail.com"
        });
        await Question.create({
            question_text: "Test Question",
            question_image: "test.jpg",
            userId:1
        });
        await Answer.create({
            answer_text: "Test Answer",
            answer_image: "testAnswer.jpg",
            approval: false,
            userId:1,
            questionId:1
        });
    }
}

module.exports = data_load;
