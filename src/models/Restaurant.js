const mongoose = require('mongoose')
const { Schema } = mongoose

const RestaurantSchema = new Schema(
  {
    name: { type: String, required: true },
    cnpj: { type: String, required: true },
    address: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Restaurant', RestaurantSchema)