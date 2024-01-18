const excelJS = require('exceljs');
const path = require('path');
const fs = require('fs').promises;
const assignmentModel = require("../../model/assignmentModel");

const getAssignmentData = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Invalid request" });
  }

  const assignmentData = await assignmentModel.findById(id).populate({
    path: "submittedUser._id",
    select: "firstName lastName email username",
  });

  if (!assignmentData) {
    return res.status(400).json({ message: "Invalid request" });
  }

  const workbook = new excelJS.Workbook();
  const worksheet = workbook.addWorksheet(assignmentData.title);

  const data = assignmentData.submittedUser;

  worksheet.columns = [
    { header: "S no.", key: "s_no", width: 10 },
    { header: "First Name", key: "firstName", width: 20 },
    { header: "Last Name", key: "lastName", width: 20 },
    { header: "Email Id", key: "email", width: 30 },
    { header: "Username", key: "username", width: 20 },
    { header: "Remarks", key: "remark", width: 20 },
  ];

  data.forEach((user, index) => {
    user._id.s_no = index + 1;
    user._id.remark = user.checked ? "Submitted" : "Not Submitted";
    worksheet.addRow(user._id);
  });

  try {
    const formattedDate = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).replace(/[\/:]/g, '_'); // Replace slashes with underscores

    const folderPath = path.resolve(__dirname, '../../sheets');
    console.log("FolderPath:", folderPath); // Log folderPath

    // Create the directory if it doesn't exist
    await fs.mkdir(folderPath, { recursive: true });

    // Log that the directory was created successfully
    console.log("Directory created successfully.");

    const filePath = path.resolve(folderPath, `assignment_${formattedDate}.xlsx`);
    await workbook.xlsx.writeFile(filePath);

    return res.status(200).send({
      status: "success",
      message: "File successfully downloaded",
      path: `/sheets/assignment_${formattedDate}.xlsx`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Something went wrong",
      err: err,
    });
  }
};

module.exports = getAssignmentData;
