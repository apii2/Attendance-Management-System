const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    validate: {
      validator: async function (value) {
        const user = await mongoose.model('User').findById(value);
        return user && user.role === 'teacher';
      },
      message: 'Invalid teacher id or user is not a teacher.',
    },
  },
  semester:{ type:Schema.Types.ObjectId, ref:"semester"},
  startTime:{type:Date},
  endTime:{type:Date}
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
