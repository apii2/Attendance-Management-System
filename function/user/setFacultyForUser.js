const UserModel = require('../../model/userModel');
const mongoose = require('mongoose');

const setFacultyForUser = async(req,res) =>{
  try{
    const {id} = req.params;

    if(!id){
      return res.status(404).json({message:"Invalid request!"});
    }

    const {facultyId,courseId,semesterId} = req.body;

    if(!facultyId || !courseId || !semesterId) {
      return res.status(404).json({message:"Please enter the id of faculty, course and semester!"});
    }

    const UserData = await UserModel.findById(id);

    if(!UserData) {
      return res.status(404).json({message:"User with the given id not found!"});
    }

    UserData.faculty= facultyId;
    UserData.course= courseId;
    UserData.semester= semesterId;
    await UserData.save();

    return res.status(200).json({message:"User details has been set"});
  } catch(error) {
    console.log(error);
    return res.status(500).json({message:"Internal Server Error!"});
  }
} 

module.exports = setFacultyForUser;