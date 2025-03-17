const mongoose = require('mongoose')
const { Schema } = mongoose

const OrderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    orderDate: { type: Date, default: Date.now },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'preparing', 'delivered'],
      default: 'pending'
    },
    items: [{
      dish: { type: Schema.Types.ObjectId, ref: 'Dish' },
      quantity: { type: Number },
    }],
    total: { type: Number, required: true }
  }
)

module.exports = mongoose.model('Order', OrderSchema)