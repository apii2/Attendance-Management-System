const semesterModel = require('../../model/semesterModel')

const getAllSemester = async(req, res) => {
  try {
    const {id}=req.params;

    if(!id) {
    return res.status(404).json({ message: "Invalid request!" });
    }

    const semesterData = await semesterModel.findById(id);

    if(!semesterData) {
      return res.status(404).json({message:"semester with the given id not found!"});
    }

    return res.status(200).json(semesterData);
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getAllSemester;
