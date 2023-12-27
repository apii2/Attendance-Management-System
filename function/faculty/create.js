const FacultyModel = require('../../model/facultyModel')

const create = async(req, res) => {
  try {
    const {name}=req.body;
    if(!name){
    return res.status(500).json({ message: "Please provide the name of the faculty!" });
    }

    let newFaculty = new FacultyModel({name});
    await newFaculty.save();
    
    return res.status(200).json({ message: "Faculty created!"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = create;