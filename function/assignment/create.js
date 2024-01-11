const subjectModel = require('../../model/subjectModel');
const userModel = require('../../model/userModel')
const assignmentModel = require("../../model/assignmentModel")

const create = async(req,res)=>{
  try{
    const {subjectID} = req.params;
    const user = req.user;
    const {title,deadline} = req.body;
    if(!subjectID || !user || !title || !deadline){
    return res.status(400).json({mesage:"Please valid data"});
    }

    const subjectObject = await subjectModel.findById(subjectID);

    if(!subjectObject){
    return res.status(400).json({mesage:"Invalid Id"});
    }

    const userObjects = await userModel.find({
        semester: subjectObject.semester,
        course: subjectObject.course,
        role:"student"
    }).select('_id');

    if(!userObjects){
    return res.status(400).json({mesage:"There are no students in this class"});
    }

    const data ={
      title,
      deadline,
      submittedUser:userObjects,
      subjectID,
      createdBy:user.userId
    }

    const assignmentObject = new assignmentModel(data);
    await assignmentObject.save();
    return res.status(200).json({mesage:data});


  }catch(error){
    console.log(error);
    return res.status(500).json({mesage:"Internal server error"});
  }
}

module.exports = create;