const Joi = require('joi');
const { Schema, default: mongoose } = require('mongoose');

const gallerySchema = Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    isHome: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const galleryValidator = (gallery) => {
    const schema = Joi.object({
        title: Joi.string().required(),
    });
    return schema.validate(gallery);
}

const Gallery = mongoose.model("Gallery", gallerySchema);
module.exports = { Gallery, galleryValidator };