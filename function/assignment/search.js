const assignmentModel = require('../../model/assignmentModel');

const search = async (req, res) => {
  try {
    const { subjectID } = req.params;
    const user = req.user;

    if (!subjectID) {
      return res.status(400).json({ message: "Invalid request!" });
    }

    let { title } = req.body;

    if (!title) {
      title = "";
    }

  
    let results = [];

    if (user.role === "student") {
      results = await assignmentModel
        .find( {
          subjectID,
          title: { $regex: new RegExp(`.*${title}.*`, 'i') },
          courseID: user.course,
          semesterID:user.semester
        })
        .sort({ deadline: 1 })
        .select("-submittedUser");
    } else {
      if(user.role === "teacher"){
      results = await assignmentModel
        .find({
          subjectID,
          title: { $regex: new RegExp(`.*${title}.*`, 'i') },
          createdBy:user.userId
        })
        .sort({ deadline: 1 })
        .populate({
          path: "submittedUser._id",
          select:"-password -refreshToken -token"
        }).populate({path:"subjectID",select:"-teacher"});
      }
      }

    if (!results || results.length === 0) {
      return res.status(404).json({ message: "Assignments not found!" });
    }

    return res.status(200).json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = search;
