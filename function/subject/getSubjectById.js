const SubjectModel = require('../../model/subjectModel');

const getById = async(req,res) =>{
  try {
    const {id} = req.params;

    if(!id){
      return res.status(404).json({ message: "Invalid request" });
    }

    const subjectData = await SubjectModel.findById(id).populate('course').populate('teacher').populate('semester').select("-refreshToken -password -token");

    return res.status(200).json(subjectData);
    
  } catch (error) {
    console.log(error);
    return res.status(200).json({message:"Internal Server Error!"});
  }
}

module.exports = getById;