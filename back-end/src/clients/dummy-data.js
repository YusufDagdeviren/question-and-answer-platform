const Question = require("../models/question");
const User = require("../models/user");
const Answer = require("../models/answer");
const bcrypt = require("bcrypt");

async function data_load() {
    const count = await User.count();
    if (count == 0) {
        const users = await User.bulkCreate([
            {
                user_name: "Admin",
                user_email: "admin@gmail.com",
                password: await bcrypt.hash("13579", 10),
                user_authority: "admin"
            },
            {
                user_name: "Test1",
                user_email: "test1@gmail.com",
                password: await bcrypt.hash("123456", 10)
            },
        ]);
        await Question.create({
            question_title: "Test Question Title",
            question_text: "Test Question",
            question_image: "test.jpg",
            userId: 2
        });
        // await Answer.create({
        //     answer_text: "Test Answer",
        //     answer_image: "testAnswer.jpg",
        //     approval: false,
        //     userId:2,
        //     questionId:1
        // });
    }
}

module.exports = data_load;
