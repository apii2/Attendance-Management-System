const semesterModel = require('../../model/semesterModel')

const update = async(req, res) => {
  try {
    const {id} = req.params;
    const {semesterName}=req.body;

    if(!semesterName && !id){
    return res.status(404).json({ message: "Please provide the semester name and id" });
    }

    let semesterData = await semesterModel.findById(id);

    if(!semesterData){
    return res.status(404).json({ message: "Semester with the given id not found!" });
    }

    semesterData.semesterName = semesterName;
    
    await semesterData.save();

    return res.status(200).json({ message: "Semester updated!" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = update;
