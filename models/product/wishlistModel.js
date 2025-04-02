const { Schema, default: mongoose } = require("mongoose");
const Joi = require("joi");

const wishlistSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true 
  }]
}, { timestamps: true });

const wishlistValidator = (data) => {
    const schema = Joi.object({
      userId: Joi.string().hex().length(24).required(),
    });
    return schema.validate(data);
  };

  const Wishlist = mongoose.model("Wishlist", wishlistSchema);
  
  module.exports = { Wishlist, wishlistValidator };