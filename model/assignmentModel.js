const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
  title: {type:String},
  deadline:{type:Date},
  submittedUser: [
    { 
      _id:{type: Schema.Types.ObjectId, ref: 'User'},
      checked:{type:Boolean,default:false},
     }
  ],
  subjectID:{type:Schema.Types.ObjectId,ref:"Subject"},
  createdAt:{type:Date,default:Date.now()},
  createdBy:{type: Schema.Types.ObjectId, ref: 'User'}
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;