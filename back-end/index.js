require('dotenv').config();

//express settings
const express = require("express");
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// express back-end router
const adminRouter = require("./src/routes/AdminRoutes");
const userRouter = require("./src/routes/UserRoutes");
// session settings
const cookieParser = require('cookie-parser');
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("./src/clients/db");

app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 //millisecond cinsinden 1 gün boyunca session oluşturmuş oluruz
    },
    store: new SequelizeStore({
        db: sequelize
    })
}))

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);

// postgresql connection
const dummy_data = require("./src/clients/dummy-data");
const associations = require("./src/models/associations");
(async () => {
    associations();
//    await sequelize.sync({ force: true });
//    await dummy_data();
//
})();

app.listen(process.env.PORT, function () {
    console.log("Started app. on port %d", process.env.PORT);
})