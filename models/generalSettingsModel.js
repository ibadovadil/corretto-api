const Joi = require('joi');
const { Schema, default: mongoose } = require('mongoose');

const generalSchema = Schema({
    logoDark: {
        type: String,
    },
    logoWhite: {
        type: String,
    },
    address: {
        type: String,
    },
    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    youtube: { type: String }
}, { timestamps: true });

const generalValidator = (general) => {
    const schema = Joi.object({
        logoDark: Joi.string(),
        logoWhite: Joi.string(),
        address: Joi.string(),
        facebook: Joi.string(),
        twitter: Joi.string(),
        instagram: Joi.string(),
        youtube: Joi.string()
    });
    return schema.validate(general);
}

const GeneralSettings = mongoose.model('GeneralSettings', generalSchema);
module.exports = { GeneralSettings, generalValidator };