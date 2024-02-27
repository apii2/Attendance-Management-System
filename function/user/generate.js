const mongoose = require('mongoose');

const userModel = require("../../model/userModel");
const courseModel = require("../../model/courseModel");

const Generate = async(req,res) => {
  try {
    const user = req.user;
    const courseID = new mongoose.Types.ObjectId(user.course);

    const userData = await courseModel.find((courseID));

    return res.status(200).json({message: userData});

  } catch(error) {
    console.log(error);
    return res.status(500).json({message: "Internal Server Error!"});
  }
}

module.exports = Generate;