const SemisterModel = require('../../model/semisterModel');

const searchSemester = async (req, res) => {
  try {
    const query = req.params.search;
    const semesters = query
      ? await SemisterModel.find({ semisterName: { $regex: new RegExp(query, 'i') } })
      : await SemisterModel.find();

    return res.status(200).json(semesters);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = searchSemester;
