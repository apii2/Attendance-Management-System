const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const UserRouter = require('./route/userRouter');
const CourseRouter = require('./route/courseRouter');
const FacultyRouter = require('./route/facultyRouter');
const semesterRouter = require('./route/semesterRouter');
const SubjectRouter = require('./route/subjectRouter');
const AttendanceRouter = require('./route/AttendanceRoute');


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config();

app.use('/users',UserRouter);
app.use('/course',CourseRouter);
app.use('/faculty',FacultyRouter);
app.use('/semester',semesterRouter);
app.use('/subject',SubjectRouter);
app.use('/attendance',AttendanceRouter);


app.listen(process.env.port || 3000, () => {
  console.log(`Server has been started`);
});


mongoose.connect(process.env.MongodbUrl)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
