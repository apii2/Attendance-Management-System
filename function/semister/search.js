const SemisterModel = require('../../model/semisterModel');

const searchSemester = async (req, res) => {
  try {
    const {search} = req.params;

    const query = {semisterName: { $regex: new RegExp(`.*${search}.*`, 'i') }};

    const semisterData = query? await SemisterModel.find(query): await SemisterModel.find();

    return res.status(200).json(semisterData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = searchSemester;