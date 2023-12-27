const SemisterModel = require('../../model/semisterModel')

const update = async(req, res) => {
  try {
    const {id} = req.params;
    const {semisterName}=req.body;
    if(!semisterName && !id){
    return res.status(500).json({ message: "Please provide the semister name and id" });
    }

    let SemisterData = await SemisterModel.findById(id);
    if(!SemisterData){
    return res.status(404).json({ message: "Semister with the given id not found!" });
    }
    SemisterData.semisterName = semisterName;
    
    await SemisterData.save();

    return res.status(200).json({ message: "Semister updated!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = update;
