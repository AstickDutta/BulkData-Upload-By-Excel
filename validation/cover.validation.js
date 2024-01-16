const Joi = require('joi');

// Define the validation schema
const coverBlukDataUpload = Joi.object({
    CoverName: Joi.required(),
    CoverCode: Joi.required(),
    CoverDescription: Joi.required(),
    Status: Joi.valid('ACTIVE', 'INACTIVE').required(),
});

module.exports = {coverBlukDataUpload}

