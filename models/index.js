const { dbConnection } = require("../config/db.config");

const { CoverMastersSchema } = require("./cover.model")


module.exports = {
    dbConnection,
    CoverMastersSchema
};