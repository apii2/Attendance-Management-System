const SubjectModel = require('../../model/subjectModel');

const deleteSubject = async(req,res) =>{
  try{
    const {id} = req.params;

    if(!id) {
      return res.status(404).json({ message: 'Invalid request!' });
    }

    const subjectData = await SubjectModel.deleteOne({_id: id});
  
    if(subjectData.deletedCount === 1){
      return res.status(200).json({message: "Subject deleted successfully!"});
    } else {
      return res.status(404).json({message: "Subject not found! "});
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Internal Server Error! "});
  }
}

module.exports = deleteSubject;