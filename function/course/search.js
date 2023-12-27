const CourseModel = require('../../model/courseModel');

const searchCourse = async (req, res) => {
  try {
    const {search} = req.params;
    const query={
      $or:[
        {
          courseCode:{ 
            $regex: new RegExp(`.*${search}.*`, 'i') 
          }
        },
        {
          courseName:{ 
            $regex: new RegExp(`.*${search}.*`, 'i')
          } 
        }
      ] 
    };

    const courses = search?await CourseModel.find(query).populate("faculty"):await CourseModel.find();

    return res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = searchCourse;
