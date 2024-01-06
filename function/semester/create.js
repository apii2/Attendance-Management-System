const semesterModel = require('../../model/semesterModel')

const create = async(req, res) => {
  try {
    const {semesterName}=req.body;

    if(!semesterName){
    return res.status(404).json({ message: "Please provide the semester name" });
    }

    let newsemester = new semesterModel({semesterName});
    await newsemester.save();

    return res.status(200).json({ message: "semester created!" });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = create;
