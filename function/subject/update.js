const SubjectModel = require('../../model/subjectModel');
const mongoose = require("mongoose");

const update = async(req,res) =>{
  try{
    const {id} = req.params;
    const {name,code,courseId,teacher,semesterId} = req.body;
    
    if(!id){
      return res.status(404).json({message:"Invalid data!"});
    }
  
    const SubjectData = await SubjectModel.findById(id);
  
    if(!SubjectData){
      return res.status(404).json({message:"Subject with the given id not found."});
    }
  
    if(name){
      SubjectData.name = name;
    }
  
    if(code){
      SubjectData.code = code;
    }
  
    if(courseId){
      SubjectData.course = new mongoose.Types.ObjectId(courseId);
    }
  
    if(teacher){
      SubjectData.teacher = new mongoose.Types.ObjectId(teacher);
    }
  
    if(semesterId){
      SubjectData.semester = new mongoose.Types.ObjectId(semesterId);
    }
  
    await SubjectData.save();
    return res.status(200).json({message:"Subject updated!"});

  } catch(error) {
    console.log(error);
    return res.status(500).json({message:"Internal Server Error!"});
    
  }
}

module.exports = update;