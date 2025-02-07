const Joi = require('joi');
const { default: mongoose, Schema } = require('mongoose');

const categorySchema = Schema({
    name: {
        type: String,
        required: true
    },
    nameAz: {
        type: String,
        required: true
    },
   
}, { timestamps: true });

const categoryValidator = (category) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        nameAz: Joi.string().required()
    });
    return schema.validate(category);
}

const Category = mongoose.model('Category', categorySchema);
module.exports = { Category, categoryValidator };