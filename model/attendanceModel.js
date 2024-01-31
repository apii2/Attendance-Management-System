const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'User' },
  semesterID: {type:Schema.Types.ObjectId,ref:"semester"},
  subjectID:{type:Schema.Types.ObjectId,ref:"Subject"},
  attendedAt:{type:Date,default:Date.now()},
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;