const { DataTypes } = require("sequelize");
const sequelize = require("../clients/db");

const Question = sequelize.define("question", {
    question_title : {
        type:DataTypes.STRING,
        allowNull: false
    },
    question_text : {
        type: DataTypes.STRING,
        allowNull: false
    },
    question_image : {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = Question;