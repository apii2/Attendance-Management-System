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

    const responseMsg = active?"activated":"de-activated";
    return res.status(200).json({message :`User ${responseMsg} successfully!`});
  } catch(error) {
    console.log(error);
    return res.status(505).json({error: "Internal Server Error!"});
  }
}

module.exports = activate;