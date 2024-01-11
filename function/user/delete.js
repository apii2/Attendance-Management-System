const userModel = require("../../model/userModel");

const deleteUser =async(req,res) =>{
  try{
    const {id} = req.params;

    if(!id) {
      return res.status(404).json({message: "Invalid request!"});
    }

    const userData = await userModel.findById(id);

    if(!userData ||  userData.role === "admin") {
      return res.status(404).json({message:"User not found or Invaid credentials!"});
    }

    await userData.deleteOne();

    return res.status(200).json({message:"User deleted successfully!"});

  } catch(error) {
    console.log(error);
    return res.status(500).json({message: "Internal Server Error!"});
  }
}

module.exports = deleteUser;