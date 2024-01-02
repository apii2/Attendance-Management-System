const FacultyModel = require('../../model/facultyModel')

const getAllFaculties = async(req, res) => {
  try {
    const {id}=req.params;

    if(!id) {
    return res.status(404).json({message:"Invalid request!"});
    }

    const facultyData = await FacultyModel.findById(id);

    return res.status(200).json(facultyData);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getAllFaculties;