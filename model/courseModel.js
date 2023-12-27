const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  faculty: { type: Schema.Types.ObjectId, ref: 'Faculty' },
  courseName: {type:String,required:true},
  courseCode: {type:String,required:true}
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;