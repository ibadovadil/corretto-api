const Joi = require('joi');
const { Schema, default: mongoose } = require('mongoose');

const productSchema = Schema({
    name: {
        type: String,
        required: true
    },
    nameAz: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    descriptionAz: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discountedPrice: {
        type: Number,
    },
    stock: {
        type: Number,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    sku: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Category'
    },
    tags: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Tag'
    },
    coverImage: {
        type: String,
        required: true
    },
    images: {
        type: [String],
    },
    isNewProduct: {
        type: Boolean,
        default: false
    },
    isSale: {
        type: Boolean,
        default: false
    },
    isSoldOut: {
        type: Boolean,
        default: false
    },
    isHome: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const ProductValidator = (Product) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        nameAz: Joi.string().required(),
        description: Joi.string().required(),
        descriptionAz: Joi.string().required(),
        price: Joi.number().required(),
        discountedPrice: Joi.number(),
        stock: Joi.number().required(),
        rate: Joi.number().required(),
        sku: Joi.string(),
        category: Joi.string().required(),
        tags: Joi.string().required(),
        isNewProduct: Joi.boolean(),
        isSale: Joi.boolean(),
        isSoldOut: Joi.boolean(),
        isHome: Joi.boolean(),
        active: Joi.boolean(),
    });
    return schema.validate(Product);
};

const Product = mongoose.model('Product', productSchema);
module.exports = { Product, ProductValidator };