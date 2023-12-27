const SemisterModel = require('../../model/semisterModel')

const getAllSemister = async(req, res) => {
  try {
    const {id}=req.params;
    let semisterData = await SemisterModel.findById(id);

    return res.status(200).json(semisterData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getAllSemister;
