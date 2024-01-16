const { DataTypes } = require("sequelize");
const { ModelOptions, dbConnection } = require('../config/db.config')

const coverModel = {
    CoverId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    CoverCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CoverName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CoverDescription: {
        type: DataTypes.STRING,
        // allowNull: false
    },
    ModifiedBy: {
        type: DataTypes.STRING,
        // allowNull: false
    },
    ModifiedOn: {
        type: DataTypes.DATEONLY,
        //allowNull: false
    },
    Status: {
        type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
        allowNull: false
    }
}

const CoverMastersSchema = dbConnection.define('coverMaster', coverModel, ModelOptions)
module.exports = { CoverMastersSchema }