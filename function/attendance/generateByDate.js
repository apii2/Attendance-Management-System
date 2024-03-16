const AttendanceModel = require('../../model/attendanceModel');
const remark = require('../../remarks.json');
const excelJS = require('exceljs');
const path = require('path');
const crypto = require('crypto')
const fs = require('fs').promises;

const GenerateByDate = async (req, res) => {
  try {
    const { subjectID, semesterID, startDate, endDate } = req.body;
    startDateInput = new Date(startDate);
    endDateInput = new Date(endDate);

    if(endDateInput<startDateInput){
      return res.status(403).json({message: "Enter valid date range!"});
    }

    const date = new Date();
    const days = getHeaders(startDateInput, endDateInput);
    const tot = days.length;

    const attendanceData = await AttendanceModel.find({ subjectID, semesterID,
      attendedAt: { $gte: startDateInput, $lte: endDateInput }
     })
      .populate('userID', 'firstName lastName email username');

    let data = [];
    let tot_remarks = 0;
    let nume = 0;

    attendanceData.forEach((j) => {
      if (!data.some((item) => item[0] === j.userID)) {
        let attended = [];
        attendanceData.forEach((e) => {
          if (j.userID === e.userID) {
            let attendedAt = e.attendedAt;
            attended = [...attended, attendedAt];
          }
        });

        const remarks = attended.length/tot;
        tot_remarks += remarks;
        let score = '';

        for (const [grade, minScore] of Object.entries(remark)) {
          if ((remarks*100) >= minScore.score) {
            score = minScore.remark;
            nume += (remarks * minScore.score);
            break;
          }
        }

        data.push([j.userID, attended, score]);
      }
    });

    const mean = nume/tot_remarks;
    let total_remark = '';
    for (const [grade, minScore] of Object.entries(remark)) {
      if (mean >= minScore.score) {
        total_remark = minScore.remark;
        break;
      }
    }
    data = data.filter(record => record[0] !== null);


    const workbook = new excelJS.Workbook();
    const worksheetName = `Attendance_${date.getTime()}_${crypto.randomBytes(6).toString('hex')}`;
    const worksheet = workbook.addWorksheet(worksheetName.substring(0, 31));

    const headers = ['S no.', 'First Name', 'Last Name', 'Email Id', ...days,'Remark'];
    worksheet.columns = headers.map((header) => ({ header, key: header, width: 20 }));

    data.forEach((attendanceRecord, index) => {
      if(!attendanceRecord[0]){
        return;
      }
      const userRow = {
        'S no.': index + 1,
        'First Name': attendanceRecord[0]?.firstName,
        'Last Name': attendanceRecord[0]?.lastName,
        'Email Id': attendanceRecord[0]?.email,
        ...getAttendanceForRow(attendanceRecord[1], days),
        "Remark":attendanceRecord[2]
      };
      worksheet.addRow(userRow);
    });
    worksheet.addRow({
      'S no.': "",
      'First Name': "Total Mean",
      'Last Name': mean,
    });
    worksheet.addRow({
      'S no.': "",
      'First Name': "Total Remark",
      'Last Name': total_remark,
    });

    const pt = `/sheets/attendance_${worksheetName}.xlsx`;
    const filePath = path.join(__dirname, `../..${pt}`);
    await workbook.xlsx.writeFile(filePath);

    return res.status(200).json({ message: 'Attendance data generated successfully', "filePath":pt });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

function getHeaders(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
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

module.exports = GenerateByDate;