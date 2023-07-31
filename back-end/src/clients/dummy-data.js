const Question = require("../models/question");
const User= require("../models/user");
const Answer = require("../models/answer");
const { setPassword } = require("../functions/token")
async function data_load(){
    const count = await User.count();
    if(count == 0){
        const user = await User.create({
            user_name: "Test",
            user_email:"test@gmail.com"
        });
        setPassword(user, "13579");
        await Question.create({
            question_title: "Test Question Title",
            question_text: "Test Question",
            question_image: "test.jpg",
            userId:1
        });
        // await Answer.create({
        //     answer_text: "Test Answer",
        //     answer_image: "testAnswer.jpg",
        //     approval: false,
        //     userId:1,
        //     questionId:1
        // });
    }
}

module.exports = data_load;
