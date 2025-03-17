const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const { Schema } = mongoose

const OrderHistorySchema = new Schema(
  {
    counterId: { type: Number, unique: true },
    itens: [{
      order: { type: Schema.Types.ObjectId, ref: 'Order' }
    }]
  }
)

orderSchema.plugin(AutoIncrement, { inc_field: 'counterId' })

module.exports = mongoose.model('OrderHistory')