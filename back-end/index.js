require('dotenv').config();

const express = require("express");
const bodyparser = require("body-parser");
require("./src/clients/redis")
var app = express();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
const passport = require("passport")
require("./src/config/passport")
app.use(passport.initialize());
const sequelize = require("./src/clients/db");
const dummy_data = require("./src/clients/dummy-data");
const cookieParser = require('cookie-parser');
const associations = require("./src/models/associations");

const adminRouter = require("./src/routes/AdminRoutes");
const userRouter = require("./src/routes/UserRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
(async () => {
   associations();
   // await sequelize.sync({ force: true });
//    await dummy_data();
})();

app.listen(process.env.PORT, function () {
    console.log("Started app. on port %d", process.env.PORT);
})