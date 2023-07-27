const { doubleCsrf } = require("csrf-csrf");
const {
    invalidCsrfTokenError,
    generateToken,
    validateRequest, 
    doubleCsrfProtection, 
}= doubleCsrf({
    getSecret: () => process.env.CSRF_SECRET_KEY,
    cookieName: "__Host-psifi.x-csrf-token", 
    cookieOptions: {
      sameSite : "lax",
      path : "/",
      secure : true,
    },
    size: 64,
    ignoredMethods: ["HEAD", "OPTIONS"],
    getTokenFromRequest: (req) => req.headers["x-csrf-token"],
});
module.exports = {
    invalidCsrfTokenError,
    generateToken,
    validateRequest,
    doubleCsrfProtection
}