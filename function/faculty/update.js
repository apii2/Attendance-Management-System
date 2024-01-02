const FacultyModel = require('../../model/facultyModel')

const update = async(req, res) => {
  try {
    const {id} = req.params;
    const {facultyName}=req.body;

    if(!facultyName && !id){
    return res.status(404).json({ message: "Please provide the semister facultyName and id" });
    }

    const FacultyData = await FacultyModel.findById(id);

    if(!FacultyData){
    return res.status(404).json({ message: "Faculty with the given id not found!" });
    }

    FacultyData.facultyName = facultyName;
    
    await FacultyData.save();

    return res.status(200).json({ message: "Faculty updated!" });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = update;
