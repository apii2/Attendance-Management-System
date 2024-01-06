const UserModel = require('../../model/userModel');

const getUsersById =async(req,res) =>{
  try{
    const {id} = req.params;

    if(!id) {
      return res.status(404).json({message:"Invalid request!"});
    }

    const UserData = await UserModel.findById(id).populate('faculty').populate('course').populate('semester').select("-refreshToken -password -token");
    
    if(!UserData){
      return res.status(404).json({message:"User not found!"});
    }

    return res.status(200).json(UserData);
    
  } catch(error) {
    console.log(error);
    return res.status(500).json({message:"Internal Server Error!"});
  }
}

module.exports = getUsersById;