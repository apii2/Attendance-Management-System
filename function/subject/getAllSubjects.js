const SubjectModel = require("../../model/subjectModel");

const getAll = async (req, res) => {
  try {
    const user = req.user;

    if (user && user.role === "admin") {
        const subjectData = await SubjectModel.find()
        .populate("course")
        .populate("teacher", "-password -refreshToken -token")
        .populate("semester");
        return res.status(200).json(subjectData);
    }

    const subjectData = await SubjectModel.find()
      .populate("course")
      .populate("semester")
      .select("-teacher");
    return res.status(200).json(subjectData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports = getAll;
