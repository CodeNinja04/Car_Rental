const mongoose = require("mongoose");

const recordSchema = mongoose.Schema(
  {
    car: { type: mongoose.Schema.ObjectId, ref: "Car" },

    carname: {
      type: String,
      required: [true, "Please enter car name"],
    },
    carmodel: {
      type: String,
      required: [true, "Please enter car model"],
    },
    carsku: {
      type: String,
      required: [true, "Please enter car sku"],
    },
    carprice: {
      type: Number,
      required: [true, "Please enter car price"],
    },

    clientname: {
      type: String,
      required: [true, "Please enter client name"],
    },

    clientemail: {
      type: String,
      required: [true, "Please enter the client email address"],
    },

    date: { type: String, required: [true, "Please enter the date"] },

    day: { type: String, required: [true, "Please enter the day"] },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("record", recordSchema);
