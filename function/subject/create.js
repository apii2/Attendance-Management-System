const SubjectModel = require('../../model/subjectModel');
const mongoose = require('mongoose');

const create = async(req,res) =>{
  try{
    const {name,code,courseId,userId,semisterId} = req.body;
    if(!name || !code || !courseId || !userId || !semisterId) {
      return res.status(404).json({message: "Invalid data!"});
    }
  
    const course = new mongoose.Types.ObjectId(courseId);
    const semister = new mongoose.Types.ObjectId(semisterId);
    const teacher = new mongoose.Types.ObjectId(userId);
  
    const newSubject = new SubjectModel({name,code,course,semister,teacher});
    await newSubject.save();

    return res.status(200).json({message: "Subject created!"});
    
  } catch(error) {
    console.log(error);
    return res.status(500).json({message: "Internal Server Error!"});
  }
  

}

module.exports = create;