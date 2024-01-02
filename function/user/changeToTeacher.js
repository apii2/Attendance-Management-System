const UserModel = require('../../model/userModel');

const changeToTeacher = async(req,res) =>{
  try{
    const {id} = req.params;

    if(!id){
      return res.status(404).json({message: "Invalid request!"});
    }

    const UserData = await UserModel.findById(id);

    if(!UserData) {
      return res.status(404).json({message:"User not found!"});
    }

    UserData.role="teacher";
    await UserData.save();

    return res.status(200).json({message: "User role updated to teacher successfully."});

  } catch(error) {
    console.log(error);
    return res.status(500).json({message: "Internal Server Error!"});
  }
}

module.exports = changeToTeacher;