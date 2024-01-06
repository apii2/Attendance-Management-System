const semesterModel = require('../../model/semesterModel');

const searchSemester = async (req, res) => {
  try {
    const {search} = req.params;

    const query = {semesterName: { $regex: new RegExp(`.*${search}.*`, 'i') }};

    const semesterData = query? await semesterModel.find(query): await semesterModel.find();

    return res.status(200).json(semesterData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = searchSemester;