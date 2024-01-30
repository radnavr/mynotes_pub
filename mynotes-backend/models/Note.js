const mongoose = require("mongoose");
const Scheema = mongoose.Schema;

const noteScheema = new Scheema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  text: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  date: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Note", noteScheema);
