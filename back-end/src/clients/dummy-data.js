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
        const user1 = await User.create({
            user_name: "Yusuf",
            user_email:"ddyusufdd@gmail.com"
        })
        setPassword(user1,"yusuf2002");
        const user2 = await User.create({
            user_name: "Admin",
            user_email: "admin@gmail.com",
            user_authority: "admin"
        })
        setPassword(user2,"admin");
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
