const { Sequelize } = require("sequelize");
require("dotenv").config();


var dbConnection = new Sequelize(
    process.env.DB_NAME,
    process.env.USER_NAME,
    process.env.DB_PASS,
    {
        dialect: "postgres",
        host: process.env.DB_HOST,
        logging: true,
    }
);

const ModelOptions = {
    freezeTableName: true,
    createdAt: "CreatedAt",
    updatedAt: "UpdatedAt",
    deletedAt: "DeletedAt"
}

module.exports = {
    dbConnection,
    ModelOptions
};