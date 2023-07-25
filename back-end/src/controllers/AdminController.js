const User = require("../models/user");
const createAnswer = function (res, status, content){
    res.status(status).json(content);
}
const register = async function (req,res){
    const user_name = req.body.user_name;
    const user_email = req.body.user_email;
    if(!user_name || !user_email){
        createAnswer(res, 400, {"message": "Missing required information"});
    }else{
        try {
            await User.create({
                user_name: user_name,
                user_email: user_email
            });
            createAnswer(res, 201, {"message": "User created"}); 
        } catch (error) {
            createAnswer(res, 500, {"message": "Error creating user"});
        }
    }
}
const getUsers = async function (req,res){
    try {
        const allUsers = await User.findAll();
        createAnswer(res, 200, allUsers);
    } catch (error) {
        createAnswer(res, 500, {"message": "Error getting users"});
    }
}
const deleteUser = async function (req,res){
    const userid = req.params.id;
    try {
        const user = await User.findByPk(userid);
        if(user){
            await user.destroy();
            createAnswer(res, 200, {"message": "User deleted"});
        }else{
            createAnswer(res, 404, {"message": "User not found"});
        }
    } catch (error) {
            createAnswer(res, 500, {"message": "Error deleting user"});
    }
}
const updateUser = async function (req,res){
    const userid = req.params.id;
    try {
        const user = await User.findByPk(userid);
        if(user){
            const user_name = req.body.user_name;
            const user_email = req.body.user_email;
            if(!user_email || !user_name){
                createAnswer(res, 400, {"message": "Missing required information"});
            }else{
                user.user_name = user_name;
                user.user_email = user_email;
                await user.save();
                createAnswer(res, 200, {"message": "User updated"});
            }
        }else{
            createAnswer(res, 404, {"message": "User not found"});
        }
    } catch (error) {
        createAnswer(res, 500, {"message": "Error updating user"});
    }
}
const getUser = async function (req,res){
    const userid = req.params.id;
    try {
        const user = await User.findByPk(userid);
        if(user){
            createAnswer(res, 200, user);
        }else{
            createAnswer(res, 404, {"message": "User not found"});
        }
    } catch (error) {
        createAnswer(res, 500, {"message": "Error getting user"});
    }
}
module.exports = {
    register,
    getUsers,
    deleteUser,
    updateUser,
    getUser
}