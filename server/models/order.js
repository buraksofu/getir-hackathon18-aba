var mongoose = require("mongoose");

var Order = mongoose.model("Order", {
  courier: { type: mongoose.Schema.Types.ObjectId, ref: "Courier" },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  item: {
    itemName: { type: String },
    price: { type: Number },
    weight: { type: Number },
    count: { type: Number }
  }
});

module.exports = Order;
