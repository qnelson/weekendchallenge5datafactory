var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PetSchema = new Schema({
  petID: { type: String, required: true },
  petName: { type: String, required: false },
  imageURL: {type: String, required: false },
  description: { type: String, required: false},
});

var Pet = mongoose.model('Pet', PetSchema);

module.exports = Pet;
