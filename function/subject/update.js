const SubjectModel = require('../../model/subjectModel');

const update = async(req,res) =>{
  try{
    const {id} = req.params;
    const {name,code,courseId,userId,semisterId} = req.body;
    
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
      SubjectData.courseId = courseId;
    }
  
    if(userId){
      SubjectData.userId = userId;
    }
  
    if(semisterId){
      SubjectData.semisterId = semisterId;
    }
  
    await SubjectData.save();
    return res.status(200).json({message:"Subject updated!"});

  } catch(error) {
    console.log(error);
    return res.status(500).json({message:"Internal Server Error!"});
    
  }
}

module.exports = update;