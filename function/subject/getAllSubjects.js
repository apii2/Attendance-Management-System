const SubjectModel = require('../../model/subjectModel');

const getAll = async(req,res) =>{
  try {
    const subjectData = await SubjectModel.find().populate('course').populate('teacher').populate('semester').select("-refreshToken -password -token");

    return res.status(200).json(subjectData);

  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Internal Server Error!"});
  }
}

module.exports = getAll;