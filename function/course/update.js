const CourseModel = require('../../model/courseModel');
const mongoose = require('mongoose');

const update = async(req, res) => {
  try {
    const {id} = req.params;
    const {faculty,courseName,courseCode}=req.body;

    if(!id){
    return res.status(404).json({ message: "Please provide id" });
    }
    
    let CourseData = await CourseModel.findById(id);

    if(!CourseData){
    return res.status(404).json({ message: "Course with the given id not found!" });
    }

    if(faculty){
      CourseData.faculty = new mongoose.Types.ObjectId(faculty);
    }

    if(courseName){
      CourseData.courseName = courseName;
    }

    if(courseCode){
      CourseData.courseCode = courseCode;
    }

    
    await CourseData.save();

    return res.status(200).json({ message: "Course updated!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = update;
