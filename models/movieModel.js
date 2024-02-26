const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema(
  {
    director_id: { type: Schema.Types.ObjectId },
    title: {
      type: String,
      required: [true, "`{PATH}` alanı zorunludur."],
      maxlength: [
        15,
        "`{PATH}` alanı (`{VALUE}`), ({MAXLENGTH}) karakterden küçük olmalıdır.",
      ],
      minlength: [
        3,
        "`{PATH}` alanı (`{VALUE}`), ({MINLENGTH}) karakterden büyük olmalıdır.",
      ],
    },
    category: {
      type: String,
      maxlength: [
        30,
        "`{PATH}` alanı (`{VALUE}`), ({MAXLENGTH}) karakterden küçük olmalıdır.",
      ],
      minlength: [
        1,
        "`{PATH}` alanı (`{VALUE}`), ({MINLENGTH}) karakterden büyük olmalıdır.",
      ],
    },
    country: {
      type: String,
      maxlength: [
        30,
        "`{PATH}` alanı (`{VALUE}`), ({MAXLENGTH}) karakterden küçük olmalıdır.",
      ],
      minlength: [
        1,
        "`{PATH}` alanı (`{VALUE}`), ({MINLENGTH}) karakterden büyük olmalıdır.",
      ],
    },
    year: {
      type: Number,
      max: [
        2025,
        "`{PATH}` alanı (`{VALUE}`), ({MAX}) tarihinden küçük olmalıdır.",
      ],
      min: [
        1900,
        "`{PATH}` alanı (`{VALUE}`), ({MIN}) tarihinden büyük olmalıdır.",
      ],
    },
    imdb_score: {
      type: Number,
      max: [
        10,
        "`{PATH}` alanı (`{VALUE}`), ({MAX}) puanından küçük olmalıdır.",
      ],
      min: [
        0,
        "`{PATH}` alanı (`{VALUE}`), ({MIN}) puanından büyük olmalıdır.",
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", MovieSchema);
