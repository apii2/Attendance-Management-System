const assignmentModel = require('../../model/assignmentModel');

const update = async(req,res) =>{
  try{
    const {id} = req.params;
    const user = req.user;

    if(!id) {
      return res.status(400).json({message:"Invalid request!"});
    }

    const Data = await assignmentModel.findById(id);

    if(!Data) {
      return res.status(400).json({message:"Data not found!"});
    }

    
    if(user.userId !== Data.createdBy.toString()) {
      return res.status(400).json({message:"Teacher id doen't match!"});
    }

    const {title,deadline} = req.body;

    if(title) {
      Data.title = title;
    }

    if(deadline) {
      Data.deadline = deadline;
    }

    await Data.save();

    return res.status(200).json(Data);
  } catch(error) {
    console.log(error);
    return res.status(500).json({message :"Internal Server Error!"});
  }
}

module.exports = update;