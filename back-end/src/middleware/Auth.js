const client = require("../clients/redis")
const { verifyAccessToken } = require("../functions/token")
const authMiddleware = async function (req, res, next) {
    var token = req.headers["authorization"];
    if (!token) {
        return res.status(401).json({ "message": "unauthorized" });
    }
    token = token.replace('Bearer ', '');
    const isBlackList = await client.get(`bl_${token}`);
    if (isBlackList) {
        return res.status(401).json({ "message": "token blacklisted" })
    }
    const xsrfToken = req.headers["x-xsrf-token"];
    if (!xsrfToken) {
        return res.status(403).json({ "message": "xsrf token unvailable" });
    }
    const { signedCookies = {} } = req;
    const { refreshToken } = signedCookies;
    const verify_xsrf = await client.get(refreshToken);
    if (!verify_xsrf || !refreshToken || verify_xsrf !== xsrfToken) {
        return res.status(401).json({ "message": "xsrf token not verify" });
    }
    verifyAccessToken(token, xsrfToken, (err, payload) => {
        if (err) {
            return res.status(401).json({ "message": "token is not verify" })
        }
        else {
            req.user = payload;
            next();
        }
    })
}
const authAdminMiddleware = async function (req, res, next) {
    var token = req.headers["authorization"];
    if (!token) {
        return res.status(401).json({ "message": "unauthorized" });
    }
    token = token.replace('Bearer ', '');
    const isBlackList = await client.get(`bl_${token}`);
    if (isBlackList) {
        return res.status(401).json({ "message": "token blacklisted" })
    }
    const xsrfToken = req.headers["x-xsrf-token"];
    if (!xsrfToken) {
        return res.status(403).json({ "message": "xsrf token unvailable" });
    }
    const { signedCookies = {} } = req;
    const { refreshToken } = signedCookies;
    const verify_xsrf = await client.get(refreshToken);
    if (!verify_xsrf || !refreshToken || verify_xsrf !== xsrfToken) {
        return res.status(401).json({ "message": "xsrf token not verify" });
    }
    verifyAccessToken(token, xsrfToken, (err, payload) => {
        if (err) {
            return res.status(401).json({ "message": "token is not verify" })
        }
        else {
            req.user = payload;
            console.log(req.user);
            //Burada adminle alakalı bir şeyler
            next();
        }
    })
}
module.exports = {
    authMiddleware,
    authAdminMiddleware
}