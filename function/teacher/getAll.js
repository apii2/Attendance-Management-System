const UserModel = require('../../model/userModel');

const getAllTeachers = async(req, res) => {
  try {
    
    const UserData = await UserModel.find({role:"teacher"}).populate('faculty').populate('course').populate('semester').select("-refreshToken -password -token");

    return res.status(200).json(UserData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getAllTeachers;
