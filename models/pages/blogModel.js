const Joi = require('joi');
const { Schema, default: mongoose } = require('mongoose');

const blogSchema = Schema({
    title: {
        type: String,
        required: true
    },
    titleAz: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    contentType: {
        type: String
    },
    contentTypeAz: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    contentAz: {
        type: String,
        required: true
    },
    isHome: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const blogValidator = (blog) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        titleAz: Joi.string().required(),
        content: Joi.string().required(),
        contentType: Joi.string().required(),
        contentTypeAz: Joi.string().required(),
        contentAz: Joi.string().required(),
    });
    return schema.validate(blog);
}

const Blog = mongoose.model("Blog", blogSchema);
module.exports = { Blog, blogValidator };