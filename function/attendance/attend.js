const ip = require("ip");
const mongoose = require("mongoose");

const Holiday = require("../../model/HolidayModel");
const Attendance = require("../../model/attendanceModel");
const Subject = require("../../model/subjectModel");

const attend = async (req, res) => {
  const user = req.user;
  const { subjectID } = req.params;

  if (!isLocalIp(user.ipAddress)) {
    return res.status(401).json({ message: "Connect to college's network to attend!" });
  }

  let data = {
    userID: new mongoose.Types.ObjectId(user.userId),
    subjectID: new mongoose.Types.ObjectId(subjectID),
  };

  try {
    const subjectObject = await Subject.findById(subjectID);
    if (!subjectObject) {
      return res.status(404).json({ message: "Enter valid subject" });
    }

    if(user.role === "teacher" && user.userId !== subjectObject.teacher.toString()){
        console.log(subjectObject.teacher.toString());
        console.log(user.userId);
        return res.status(404).json({ message: "You cannot attend this class." });
    }else if (
        subjectObject.course.toString() !== user.course ||
        subjectObject.semester.toString() !== user.semester
      ) {
        return res.status(404).json({ message: "You cannot attend this class.." });
      }

    if (!subjectObject.startTime || !subjectObject.endTime) {
      return res.status(404).json({ message: "Subject timing has not been defined" });
    }

    if (!checkRange(subjectObject.startTime, subjectObject.endTime)) {
      return res.status(401).json({ message: "You have missed the class." });
    }

    data.semesterID= new mongoose.Types.ObjectId(subjectObject.semester);
  } catch (err) {
    return res.status(404).json({ message: "Provide a valid id" });
  }

  try {
    const holidayDate = await Holiday.findOne({ date: new Date() });

    if (holidayDate) {
      return res.status(401).json({ message: "Today is holiday." });
    }

    if (!user.faculty || !user.course || !user.semester) {
      return res.status(401).json({message: "Please contact admin to get assigned to our course."});
    }
    
    const newAttendance = new Attendance(data);
    await newAttendance.save();

    return res.status(200).json({ message: "Attendance done successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

const isLocalIp = (ipAddress) => {
  if (ipAddress === "::1" || ipAddress === "127.0.0.1") {
    return true;
  }

  try {
    return ip.isPrivate(ipAddress);
  } catch (error) {
    return false;
  }
};

const checkRange = (startTime, endTime) => {
  const currentDate = new Date();
  const timeStartRange = new Date(startTime);
  const timeEndRange = new Date(endTime);

  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();

  const startHour = timeStartRange.getHours();
  const startMinute = timeStartRange.getMinutes();
  const endHour = timeEndRange.getHours();
  const endMinute = timeEndRange.getMinutes();

  return (
    (currentHour > startHour ||
      (currentHour === startHour && currentMinute >= startMinute)) &&
    (currentHour < endHour ||
      (currentHour === endHour && currentMinute <= endMinute))
  );
};

module.exports = attend;