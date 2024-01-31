const AttendanceModel = require('../../model/attendanceModel');
const excelJS = require('exceljs');
const path = require('path');
const crypto = require('crypto')
const fs = require('fs').promises;

const Generate = async (req, res) => {
  try {
    const { subjectID, semesterID } = req.body;
    const date = new Date();
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const days = getHeaders(date.getMonth(), date.getFullYear());

    const attendanceData = await AttendanceModel.aggregate([
      {
        $match: {
          subjectID,
          semesterID,
          attendedAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: '$userID',
          attendedAt: { $push: '$attendedAt' }
        }
      },
      {
        $lookup: {
          from: 'users', // Assuming the collection name for the 'User' model is 'users'
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          _id: 0,
          userID: '$_id',
          firstName: '$user.firstName',
          lastName: '$user.lastName',
          email: '$user.email',
          username: '$user.username',
          attendedAt: 1
        }
      }
    ]);

    const workbook = new excelJS.Workbook();
    const worksheetName = `Attendance_${subjectID}_${semesterID}_${date.getTime()}`;
    const worksheet = workbook.addWorksheet(worksheetName.substring(0, 31));

    const headers = ['S no.', 'First Name', 'Last Name', 'Email Id', 'Username', 'Remarks', ...days];
    worksheet.columns = headers.map((header) => ({ header, key: header, width: 20 }));

    attendanceData.forEach((attendanceRecord, index) => {
      const userRow = {
        'S no.': index + 1,
        'First Name': attendanceRecord.firstName,
        'Last Name': attendanceRecord.lastName,
        'Email Id': attendanceRecord.email,
        'Username': attendanceRecord.username,
        'Remarks': attendanceRecord.attendedAt.length > 0 ? 'Attended' : 'Absent',
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
