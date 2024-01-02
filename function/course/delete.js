const CourseModel = require('../../model/courseModel');

const deleteCourse = async (req, res) => {
  try {
    const {id} = req.params;

    if(!id){
      return res.status(404).json({ message: "Invalid request!" });
    }

    const courseData = await CourseModel.deleteOne({ _id: id });

    if (courseData.deletedCount === 1) {
      return res.status(200).json({ message: 'Course deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = deleteCourse;