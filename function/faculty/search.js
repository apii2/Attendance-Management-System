const FacultyModel = require('../../model/facultyModel');

const searchFaculty = async (req, res) => {
  try {
    const query = req.params.search;
    const faculties = query
      ? await FacultyModel.find({ name: { $regex: new RegExp(query, 'i') } })
      : await FacultyModel.find();

    return res.status(200).json(faculties);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = searchFaculty;
