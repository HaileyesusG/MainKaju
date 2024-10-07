const mongoose = require("mongoose");
const withdrawSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please enter category"],
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please enter userid"],
      ref: "User",
    },
    email: {
      type: String,
      required: [true, "Please enter userEmail"],
      ref: "User",
    },

    bank: {
      type: String,
      required: [true, "Please enter bank"],
    },
    amount: {
      type: Number,
      required: [true, "Please enter amount"],
    },

    accountNumber: {
      type: String,
      required: [true, "Please enter accountNumber"],
    },
  },
  { timestamps: true }
);

const other = mongoose.model("other", withdrawSchema);
module.exports = other;
