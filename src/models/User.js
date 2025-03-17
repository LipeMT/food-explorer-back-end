const mongoose = require("mongoose")
const { Schema } = mongoose

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String },
    restaurants: [{ type: Schema.Types.ObjectId, ref: 'Restaurant' }],
    role: {
      type: String,
      required: true,
      enum: ["admin", "customer"],
      default: "customer"
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)