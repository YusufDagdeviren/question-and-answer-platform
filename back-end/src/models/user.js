const { DataTypes } = require("sequelize");
const sequelize = require("../clients/db");

const User = sequelize.define("user", {
    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_authority: {
        type: DataTypes.STRING,
        defaultValue: "user"
    },
    number_of_answer: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

module.exports = User;