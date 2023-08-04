const { client } = require("../clients/redis")
const { verifyAccessToken, verifyRefreshToken } = require("../functions/token")

const authMiddleware = async function (req, res, next) {
    var token = req.headers["authorization"];
    const xsrfToken = req.headers["x-xsrf-token"];
    const refreshToken = req.headers["refresh-token"];
    if (!token || !xsrfToken || !refreshToken) {
        return res.status(401).json({ "message": "unauthorized" });
    }
    const isBlackList = await client.get(`bl_${token}`);
    if (isBlackList) {
        return res.status(401).json({ "message": "token blacklisted" })
    }
    try {
        const payload = await verifyAccessToken(token, xsrfToken)
        req.user = payload;
        const verify_refresh_token = await client.get(req.user.id);
        if (!verify_refresh_token || !refreshToken || verify_refresh_token !== refreshToken) {
            return res.status(401).json({ "message": "refreshToken is not verify" });
        } else {
            try {
                const refreshPayload = await verifyRefreshToken(refreshToken)
                next();
            } catch (error) {
                return res.status(401).json({ "message": "refresh token is not verify" })
            }

        }
    } catch (error) {
        return res.status(401).json({ "message": "Token is not verify" });
    }

}
const authAdminMiddleware = async function (req, res, next) {
    var token = req.headers["authorization"];
    const xsrfToken = req.headers["x-xsrf-token"];
    const refreshToken = req.headers["refresh-token"];
    if (!token || !xsrfToken || !refreshToken) {
        return res.status(401).json({ "message": "unauthorized" });
    }
    const isBlackList = await client.get(`bl_${token}`);
    if (isBlackList) {
        return res.status(401).json({ "message": "token blacklisted" })
    }
    try {
        const payload = await verifyAccessToken(token, xsrfToken)
        req.user = payload;
        const verify_refresh_token = await client.get(req.user.id);
        if (!verify_refresh_token || !refreshToken || verify_refresh_token !== refreshToken) {
            return res.status(401).json({ "message": "refreshToken is not verify" });
        } else {
            try {
                const refreshPayload = await verifyRefreshToken(refreshToken)
                if (req.user.user_authority !== "admin") {
                    return res.status(401).json({ "message": "unauthorized action" });
                }
                next();
            } catch (error) {
                return res.status(401).json({ "message": "refresh token is not verify" })
            }

        }
    } catch (error) {
        return res.status(401).json({ "message": "Token is not verify" });
    }

}
module.exports = {
    authMiddleware,
    authAdminMiddleware
}