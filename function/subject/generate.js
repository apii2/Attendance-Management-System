const mongoose = require('mongoose');

const subjectModel = require("../../model/subjectModel");

const Generate = async(req,res) => {
  try {
    const user = req.user;

    if(!user.course || !user.semester){
      return res.status(404).json({error:"Please enter valid course and semester!"});
    }
    const courseID = user.course;
    const semesterID = user.semester;


    const sub = await subjectModel.find({semester: semesterID});
    let subs = [];

    sub.forEach(subject => {
      const courseIDToString = subject.course.toString();
      if(courseIDToString == courseID.toString()){
        subs = subject.name;
      }
    });

    return res.status(200).json({message: "The list of subjects",subs});

  } catch(error) {
    console.log(error);
    return res.status(500).json({message: "Internal Server Error!"});
  }
}

module.exports = Generate;