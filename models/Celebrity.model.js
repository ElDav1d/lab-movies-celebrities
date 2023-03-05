const { Schema, model, default: mongoose } = require("mongoose");

const celebSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    catchPhrase: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Celebrity = model("Celebrity", celebSchema);

module.exports = Celebrity;
