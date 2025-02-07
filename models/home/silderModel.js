const Joi = require('joi');
const { Schema, default: mongoose } = require('mongoose');

const sliderSchema = Schema({
    title: {
        type: String,
        required: true
    },
    titleAz:{
        type:String,
        required:true
    },
    description: {
        type: String,
    },
    descriptionAz: {
        type: String,
    },
    backgroundImage: {
        type: String,
        required: true
    },
    buttonUrl:{
        type: String,
        required: true
    },
    isActive :{
        type:Boolean,
        default: true
    }
}, {timestamps: true});

const sliderValidator =(slider)=>{
    const schema = Joi.object({
        title: Joi.string().required(),
        titleAz: Joi.string().required(),
        description: Joi.string().required(),
        descriptionAz: Joi.string().required(),
        buttonUrl: Joi.string().required(),
    });
    return schema.validate(slider);
}

const Slider = mongoose.model('Slider', sliderSchema);
module.exports = { Slider, sliderValidator };