const CourseModel = require('../../model/courseModel')

const getAllCourses = async(req, res) => {
  try {
    const {id}=req.params;
    
    if(!id){
    return res.status(404).json({ message: "Invalid request" });
    }

    let courseData = await CourseModel.findById(id).populate("faculty");

    return res.status(200).json(courseData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getAllCourses;
