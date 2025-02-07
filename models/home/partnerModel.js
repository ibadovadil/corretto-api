const Joi = require('joi');
const { Schema, default: mongoose } = require('mongoose');

const partnerSchema = Schema({
    image: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
}, { timestamps: true });

const partnerValidator = (partner) => {
    const schema = Joi.object({
        url: Joi.string().required(),
    });
    return schema.validate(partner);
}

const Partner = mongoose.model('Partner', partnerSchema);
module.exports = { Partner, partnerValidator };