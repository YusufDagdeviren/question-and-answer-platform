const { DataTypes } = require("sequelize");
const sequelize = require("../clients/db");

const Answer = sequelize.define("answer", {
    answer_text : {
        type: DataTypes.STRING,
        allowNull: false
    },
    answer_image : {
        type: DataTypes.STRING,
        allowNull: true
    },
    approval : {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Answer;