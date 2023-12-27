const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'teacher', 'student'], required: true,default:'student' },
  // Common fields for all users
  firstName: {type:String,required:true},
  middleName:{type:String},
  lastName: {type:String,required:true},
  email: {type:String,required:true,unique:true},
  phoneNumber: {type:Number,required:true,unique:true},
  dob: {type:Date,required:true},
  address: {type:String,required:true},

  // Fields specific to certain roles
  faculty: { type: Schema.Types.ObjectId, ref: 'Faculty' },
  courses: { type: Schema.Types.ObjectId, ref: 'Course' },
  semister:{type:Schema.Types.ObjectId,ref:"semister"},
  // Add other user-related fields as needed
  createdAt:{type:Date,default:Date.now},
  token:{type:String},
  refreshToken:{type:String}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
