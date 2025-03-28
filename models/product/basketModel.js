const Joi = require("joi");
const { Schema, default: mongoose } = require("mongoose");

const basketSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  products: [{
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, default: 1, min: 1 },
  }],
  totalPrice: { type: Number, default: 0, min: 0 },
}, { timestamps: true });

const objectId = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

const basketValidator = (basket) => {
  const schema = Joi.object({
    products: Joi.array()
      .items(
        Joi.object({
          product: objectId.required(),
          quantity: Joi.number().min(1).default(1),
        })
      )
      .min(1)
      .required(),
    totalPrice: Joi.number().min(0),
  });
  return schema.validate(basket);
};

const Basket = mongoose.model("Basket", basketSchema);

module.exports = { Basket, basketValidator };
