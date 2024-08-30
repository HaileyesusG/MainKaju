const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "Please enter category"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please enter userId"],
      ref: "User",
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please enter itemId"],
    },
    type: {
      type: String,
      required: [true, "Please enter type"],
    },
    image: {
      type: String,
      required: [true, "Please image"],
    },
    price: {
      type: String,
      required: [true, "Please enter price"],
    },
    quantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("cart", cartSchema);
module.exports = Cart;
