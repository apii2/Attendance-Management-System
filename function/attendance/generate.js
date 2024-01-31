const AttendanceModel = require('../../model/attendanceModel');
const excelJS = require('exceljs');
const path = require('path');
const crypto = require('crypto')
const fs = require('fs').promises;

const Generate = async (req, res) => {
  try {
    const { subjectID, semesterID } = req.body;
    const date = new Date();
    const days = getHeaders(date.getMonth(), date.getFullYear());
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const attendanceData = await AttendanceModel.find({ subjectID, semesterID,
      attendedAt: { $gte: startDate, $lte: endDate }
     })
      .populate('userID', 'firstName lastName email username')
      .lean(); // Using .lean() to get plain JavaScript objects, not Mongoose documents

    const workbook = new excelJS.Workbook();
    const worksheetName = `Attendance_${date.getTime()}_${crypto.randomBytes(6).toString('hex')}`;
    const worksheet = workbook.addWorksheet(worksheetName.substring(0, 31));

    const headers = ['S no.', 'First Name', 'Last Name', 'Email Id', ...days];
    worksheet.columns = headers.map((header) => ({ header, key: header, width: 20 }));

    attendanceData.forEach((attendanceRecord, index) => {
      const user = attendanceRecord.userID;
      const userRow = {
        'S no.': index + 1,
        'First Name': user.firstName,
        'Last Name': user.lastName,
        'Email Id': user.email,
        
        
        ...getAttendanceForRow(attendanceRecord.attendedAt, days),
      };
      worksheet.addRow(userRow);
    });

    const filePath = path.join(__dirname, `attendance_${worksheetName}.xlsx`);
    await workbook.xlsx.writeFile(filePath);

    return res.status(200).json({ message: 'Attendance data generated successfully', filePath });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

function getHeaders(month, year) {
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);
  const dateArray = [];

  for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
    dateArray.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
  }

  return dateArray;
}

function getAttendanceForRow(attendedAt, days) {
  const attendanceMap = new Map();

  // Initialize attendance map with 'Absent' for all days
  days.forEach(day => {
    attendanceMap.set(day, 'Absent');
  });

  // Update attendance map with 'Attended' for the specific dates
  if (attendedAt) {
    const day = attendedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    attendanceMap.set(day, 'Attended');
  }

  return Object.fromEntries(attendanceMap);
}

module.exports = Generate;
