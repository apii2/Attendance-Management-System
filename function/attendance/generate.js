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
      attendedAt: { $gte: startDate, $lte: endDate },
      role:"student"
     })
      .populate('userID', 'firstName lastName email username');

      let totalPresent = attendanceData.length;


    let data = [];

    attendanceData.forEach((j) => {
      if (!data.some((item) => item[0] === j.userID)) {
        let attended = [];
        attendanceData.forEach((e) => {
          if (j.userID === e.userID) {
            let attendedAt = e.attendedAt;
            attended = [...attended, attendedAt];
          }
        });
        data.push([j.userID, attended]);
      }
    });

    data.length;
    
    

    const workbook = new excelJS.Workbook();
    const worksheetName = `Attendance_${date.getTime()}_${crypto.randomBytes(6).toString('hex')}`;
    const worksheet = workbook.addWorksheet(worksheetName.substring(0, 31));

    const headers = ['S no.', 'First Name', 'Last Name', 'Email Id', ...days];
    worksheet.columns = headers.map((header) => ({ header, key: header, width: 20 }));

    data.forEach((attendanceRecord, index) => {
      const userRow = {
        'S no.': index + 1,
        'First Name': attendanceRecord[0].firstName,
        'Last Name': attendanceRecord[0].lastName,
        'Email Id': attendanceRecord[0].email,
        ...getAttendanceForRow(attendanceRecord[1], days),
      };
      worksheet.addRow(userRow);
    });

    const filePath = path.join(__dirname, `../../sheets/attendance_${worksheetName}.xlsx`);
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
  const attendanceMap = {};

  days.forEach(day => {
    attendanceMap[day] = 'Absent';
  });

  if (attendedAt && attendedAt.length > 0) {

    attendedAt.forEach(date => {

      const key = new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      if (attendanceMap.hasOwnProperty(key)) {
        attendanceMap[key] = 'Present';
      }
    });
  }

  return attendanceMap;
}

module.exports = Generate;
