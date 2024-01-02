const FacultyModel = require('../../model/facultyModel');

const getAllFaculty = async(req, res) => {
  try {
    const facultyData = await FacultyModel.find();

    return res.status(200).json(facultyData);
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getAllFaculty;
