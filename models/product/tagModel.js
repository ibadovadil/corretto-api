const Joi = require('joi');
const { default: mongoose, Schema } = require('mongoose');

const tagSchema = Schema({
    name: {
        type: String,
        required: true
    },
    nameAz: {
        type: String,
        required: true
    },

}, { timestamps: true });

const tagValidator = (tag) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        nameAz: Joi.string().required()
    });
    return schema.validate(tag);
}

const Tag = mongoose.model('Tag', tagSchema);
module.exports = { Tag, tagValidator };