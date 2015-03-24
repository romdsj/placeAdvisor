var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
  name:  String,
  placeType: String,
  stars: Number
});

var Reviews = mongoose.model('reviews', reviewSchema);

module.exports = Reviews;