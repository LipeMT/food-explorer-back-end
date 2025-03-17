const mongoose = require("mongoose")
const { Schema } = mongoose

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Category', CategorySchema)