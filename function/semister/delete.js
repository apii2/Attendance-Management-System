const SemisterModel = require('../../model/semisterModel');

const deleteSemister = async (req, res) => {
  try {
    const {id} = req.params;

    if(!id) {
      return res.status(404).json({ message: 'Invalid request!' });
    }

    const semisterData = await SemisterModel.deleteOne({ _id: id });

    if (semisterData.deletedCount === 1) {
      return res.status(200).json({ message: 'Semester deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Semester not found' });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = deleteSemister;
