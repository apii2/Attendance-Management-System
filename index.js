const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const AuthController = require('./controller/AuthController');
const UserRouter = require('./route/userRouter');
const CourseRouter = require('./route/courseRouter');
const FacultyRouter = require('./route/facultyRouter');
const SemesterRouter = require('./route/semesterRouter');
const SubjectRouter = require('./route/subjectRouter');
const AttendanceRouter = require('./route/AttendanceRoute');
const AssignmentRouter = require('./route/AssignmentRoute')


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/sheets',AuthController.teacherAuth,express.static("./sheets"));

require('dotenv').config();

app.use('/users',UserRouter);
app.use('/course',CourseRouter);
app.use('/faculty',FacultyRouter);
app.use('/semester',SemesterRouter);
app.use('/subject',SubjectRouter);
app.use('/attendance',AttendanceRouter);
app.use('/assignment',AssignmentRouter);

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
