const mongoose = require("mongoose")
const { Schema } = mongoose

const DishSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    description: { type: String, required: true },
    price: { type: String, required: true },
    ingredients: { type: Array },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },

  },
  { timestamps: true }
)

module.exports = mongoose.model('Dish', DishSchema)