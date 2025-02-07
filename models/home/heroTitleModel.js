const Joi = require("joi")
const { Schema, default: mongoose } = require("mongoose")

const heroTitleSchema = Schema({
    title: { type: String, required: true },
    titleAz: { type: String, required: true },
    description: { type: String, required: true },
    descriptionAz: { type: String, required: true },
    image: { type: String, required: true },
}, {timestamps: true});

const heroTitleValidator = (hero)=>{
    const schema = Joi.object({
        title:Joi.string().required(),
        titleAz:Joi.string().required(),
        description:Joi.string().required(),
        descriptionAz:Joi.string().required()
    })
    return schema.validate(hero)
}
const HeroTitle = mongoose.model('HeroTitle',heroTitleSchema);
module.exports={HeroTitle,heroTitleValidator}