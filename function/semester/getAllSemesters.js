const semesterModel = require('../../model/semesterModel')

const getAllSemester = async(req, res) => {
  try {
    const semesterData = await semesterModel.find();

    return res.status(200).json(semesterData);
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getAllSemester;
