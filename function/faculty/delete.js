const FacultyModel = require('../../model/facultyModel');

const deleteFaculty = async (req, res) => {
  try {
    const {id} = req.params;

    if(!id){
      return res.status(404).json({ message: "Invalid request!" });
    }

    const facultyData = await FacultyModel.deleteOne({ _id: id });

    if (facultyData.deletedCount === 1) {
      return res.status(200).json({ message: 'Faculty deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Faculty not found' });
    }
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = deleteFaculty;
