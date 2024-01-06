const semesterModel = require('../../model/semesterModel');

const deleteSemester = async (req, res) => {
  try {
    const {id} = req.params;

    if(!id) {
      return res.status(404).json({ message: 'Invalid request!' });
    }

    const semesterData = await semesterModel.deleteOne({ _id: id });

    if (semesterData.deletedCount === 1) {
      return res.status(200).json({ message: 'Semester deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Semester not found' });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = deleteSemester;
