const CourseModel = require('../../model/courseModel')

const getAllCourses = async(req, res) => {
  try {
  
    let courseData = await CourseModel.find().populate('faculty');

    return res.status(200).json(courseData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getAllCourses;
