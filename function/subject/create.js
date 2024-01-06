const SubjectModel = require('../../model/subjectModel');
const mongoose = require('mongoose');

const create = async(req,res) =>{
  try{
    const {name,code,courseId,userId,semesterId} = req.body;
    
    if(!name || !code || !courseId || !userId || !semesterId) {
      return res.status(404).json({message: "Invalid data!"});
    }
  
    const course = new mongoose.Types.ObjectId(courseId);
    const semester = new mongoose.Types.ObjectId(semesterId);
    const teacher = new mongoose.Types.ObjectId(userId);
  
    const newSubject = new SubjectModel({name,code,course,semester,teacher});
    await newSubject.save();

    return res.status(200).json({message: "Subject created!"});
    
  } catch(error) {
    console.log(error);
    return res.status(500).json({message: "Internal Server Error!"});
  }
}

module.exports = create;