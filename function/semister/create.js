const SemisterModel = require('../../model/semisterModel')

const create = async(req, res) => {
  try {
    const {semisterName}=req.body;
    if(!semisterName){
    return res.status(500).json({ message: "Please provide the semister name" });
    }

    let newSemister = new SemisterModel({semisterName});
    await newSemister.save();

    return res.status(200).json({ message: "Semister created!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = create;
