const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const {
    setPassword,
    isPasswordTrue
} = require("../functions/token")

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (user_email, password, done) => {
            try {
                const user = await User.findOne({
                    where: {
                        user_email: user_email
                    }
                })
                if (!user) {
                    return done(null, false, { mesaj: "Wrong E-mail" });
                }
                if (!isPasswordTrue(user,password)) {
                    return done(null, false, { mesaj: "Wrong Password" });
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);