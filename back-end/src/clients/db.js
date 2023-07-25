require('dotenv').config();
const config = {
    db: {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
}
const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    dialect: "postgres",
    host: config.db.host,
    define: {
        timestamps: false
    }
})
async function connect() {
    try {
        await sequelize.authenticate();
        console.log("postgresql connection made");
    } catch (err) {
        console.log("connection failed ", err);
    }
}
connect();
module.exports = sequelize;
