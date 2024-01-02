const FacultyModel = require('../../model/facultyModel')

const create = async(req, res) => {
  try {
    const {facultyName}=req.body;

    if(!facultyName){
    return res.status(404).json({ message: "Please provide the facultyName of the faculty!" });
    }

    let newFaculty = new FacultyModel({facultyName});
    await newFaculty.save();
    
    return res.status(200).json({ message: "Faculty created!"});

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = create;