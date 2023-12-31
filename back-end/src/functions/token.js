const randtoken = require('rand-token');
const jwt = require("jsonwebtoken");
const moment = require('moment');
const ms = require('ms');
const crypto = require("crypto")
const util = require('util');

const generateAccessToken = function (user) {
    const u = {
        id: user.id,
        user_authority: user.user_authority,
        user_email: user.user_email
    };

    const xsrfToken = randtoken.generate(24);

    const privateKey = process.env.JWT_SECRET + xsrfToken;

    const token = jwt.sign(u, privateKey, { expiresIn: process.env.ACCESS_TOKEN_LIFE });

    const expiredAt = moment().add(ms(process.env.ACCESS_TOKEN_LIFE), 'ms').valueOf(); //15 dakikada bir jeton üret

    return {
        xsrfToken,
        token,
        expiredAt
    }
}
const generateRefreshToken = function (id) {
    const refresh_token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.REFRESH_TOKEN_LIFE });
    return refresh_token;
}
const verifyAccessToken = async function (token, xsrfToken = '') {
    const privateKey = process.env.JWT_SECRET + xsrfToken;
    const verifyAsync = util.promisify(jwt.verify);
    try {
        const payload = await verifyAsync(token, privateKey);
        return payload;
    } catch (error) {
        throw error;
    }
}
const verifyRefreshToken = async function (refresh_token) {
    const verifyAsync = util.promisify(jwt.verify);
    try {
        const payload = await verifyAsync(refresh_token, process.env.JWT_SECRET);
        return payload;
    } catch (error) {
        throw error;
    }
}


const setPassword = function (user, password) {
    user.salt = crypto.randomBytes(16).toString("hex")
    user.hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, "sha512").toString("hex");
    user.save();
}
const isPasswordTrue = function (user, password) {
    const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, "sha512").toString("hex");
    return user.hash == hash;
}
module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    setPassword,
    isPasswordTrue,
}