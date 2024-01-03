const SemisterModel = require('../../model/semisterModel')

const getAllSemister = async(req, res) => {
  try {
    const {id}=req.params;

    if(!id) {
    return res.status(404).json({ message: "Invalid request!" });
    }

    const semisterData = await SemisterModel.findById(id);

    if(!semisterData) {
      return res.status(404).json({message:"Semister with the given id not found!"});
    }

    return res.status(200).json(semisterData);
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getAllSemister;
