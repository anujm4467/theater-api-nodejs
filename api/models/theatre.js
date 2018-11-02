const mongoose = require("mongoose");
const TheatreSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  filmName: [{ type: String }]
});

module.exports = mongoose.model("Theatre", TheatreSchema);
