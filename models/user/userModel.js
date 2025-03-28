const Joi = require("joi");
const { Schema, default: mongoose } = require("mongoose");
const jwt = require('jsonwebtoken');

const userSchema = Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'moderator'],
        default: 'user',
    },
    basket: {
        type: Schema.Types.ObjectId,
        ref: "Basket",
    }
}, { timestamps: true });

const UserValidation = (user) => {
    const schema = new Joi.object({
        fullname: Joi.string().required(),
        email: Joi.string().email().required().min(3).max(50),
        phone: Joi.string().required(),
        password: Joi.string().required().min(3).max(50),
        active: Joi.boolean(),
        role: Joi.string().valid('admin', 'user', 'moderator'),
        basket: Joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null),
    });
    return schema.validate(user);
}


const LoginValidation = (user) => {
    const schema = new Joi.object({
        email: Joi.string().email().required().min(3).max(50),
        password: Joi.string().required().min(3).max(50),
    });
    return schema.validate(user);
}

userSchema.methods.generateAuthToken = function () {
    const decodedToken = jwt.sign({
        id:this._id.toString(),
        fullname: this.fullname,
        role: this.role
    },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '24h' });  //Create Token
    return decodedToken;
}



const User = mongoose.model('User', userSchema);
module.exports = { User, UserValidation, LoginValidation };