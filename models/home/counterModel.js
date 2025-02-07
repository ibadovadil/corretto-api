const Joi = require("joi")
const { Schema, default: mongoose } = require('mongoose')

const counterSchema = Schema({
    title: { type: String, required: true },
    titleAz: { type: String, required: true },
    description: { type: String, required: true },
    descriptionAz: { type: String, required: true },
    number: { type: Number, required: true }
}, { timestamps: true });

const counterValidator = (counter) => {
    const schema = new Joi.object({
        title: Joi.string().required(),
        titleAz: Joi.string().required(),
        description: Joi.string().required(),
        descriptionAz: Joi.string().required(),
        number: Joi.number().required()
    });
    return schema.validate(counter);
};

const Counter = mongoose.model('Counter', counterSchema);
module.exports = { Counter, counterValidator };
