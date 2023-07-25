require('dotenv').config();

const express = require("express");
var app = express();

const sequelize = require("./src/clients/db");
//const dummy_data = require("./src/clients/dummy-data");
const associations = require("./src/models/associations");

const adminRouter = require("./src/routes/AdminRoutes");
const userRouter = require("./src/routes/UserRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
(async () => {
    associations();
    //await sequelize.sync({ force: true });
    //await dummy_data();
})();

app.listen(process.env.PORT, function () {
    console.log("Started app. on port %d", process.env.PORT);
})