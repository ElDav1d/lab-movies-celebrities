const { Schema, model, default: mongoose } = require("mongoose");

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    genre: {
      type: String,
      required: true,
    },
    plot: {
      type: String,
      required: true,
    },
    cast: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Celebrity",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Movie = model("Movie", movieSchema);

module.exports = Movie;
