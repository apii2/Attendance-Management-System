const mongoose = require('mongoose');

const subjectModel = require("../../model/subjectModel");

const Generate = async(req,res) => {
  try {
    const user = req.user;

    const courseID = new mongoose.Types.ObjectId(user.course);
    const semesterID = new mongoose.Types.ObjectId(user.semester);


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