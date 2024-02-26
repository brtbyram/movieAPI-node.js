const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DirectorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 60,
      minlength: 2,
    },
    surname: {
      type: String,
      required: true,
      maxlength: 60,
      minlength: 2,
    },
    bio: {
      type: String,
      required: true,
      maxlength: 1000,
      minlength: 60,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Director", DirectorSchema);
