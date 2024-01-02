const FacultyModel = require('../../model/facultyModel');

const searchFaculty = async (req, res) => {
  try {
    const {search} = req.params;
    const query = { facultyName: { $regex: new RegExp(`.*${search}.*`, 'i') } };

    const facultyData = query? await FacultyModel.find(query): await FacultyModel.find();

    return res.status(200).json(facultyData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = searchFaculty;
