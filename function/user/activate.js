const userModel = require('../../model/userModel');

const activate = async(req,res) => {
  const {id} = req.params;
  const {active} = req.body;

  try{
    const userData = await userModel.findById(id);

    if(!userData.semester || !userData.course || !userData.faculty){
      return res.status(403).json({message: "Please set the details first!"});
    }

    userData.active = active;
    await userData.save();

    return res.status(200).json({message :"User activated successfully!"});
  } catch(error) {
    console.log(error);
    return res.status(505).json({error: "Internal Server Error!"});
  }
}

module.exports = activate;