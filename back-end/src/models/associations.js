const User = require("./user");
const Question = require("./question");
const Answer = require("./answer");
const associations = () => {
    User.hasMany(Question, {
        foreignKey: {
            allowNull: false
        }
    });
    Question.belongsTo(User);
    User.hasMany(Answer, {
        foreignKey: {
            allowNull: false
        }
    });
    Answer.belongsTo(User);
    Question.hasMany(Answer, {
        foreignKey: {
            allowNull: false
        }
    });
    Answer.belongsTo(Question);
}
module.exports = associations;