const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const semesterSchema = new Schema({
  semesterName: {type:String, required:true}
});

const semester = mongoose.model('semester', semesterSchema);

module.exports = semester;
