const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const semisterSchema = new Schema({
  semisterName: {type:String, required:true}
});

const Semister = mongoose.model('Semister', semisterSchema);

module.exports = Semister;
