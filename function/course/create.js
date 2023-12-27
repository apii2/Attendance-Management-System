const CourseModel = require('../../model/courseModel')
const mongoose= require('mongoose');

const create = async(req, res) => {
  try {
    const {facultyId,courseName,courseCode}=req.body;
    if(!facultyId || !courseName || !courseCode){
    return res.status(500).json({ message: "Please provide the faculty,name and code of the course!" });
    }

    const faculty = new mongoose.Types.ObjectId(facultyId);

    const newCourse = new CourseModel({faculty,courseName,courseCode});
    await newCourse.save();

    return res.status(200).json({ message: "Course created!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = create;
