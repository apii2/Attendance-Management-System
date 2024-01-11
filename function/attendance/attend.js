const ip = require("ip");
const mongoose = require("mongoose");
const Holiday = require("../../model/HolidayModel");
const Attendance = require("../../model/attendanceModel");
const Subject = require("../../model/subjectModel");

const attend = async (req, res) => {
  // Retrieve the client's IP address from the request object
  const user = req.user;
  const { subjectID } = req.params;
  // Check if the client's IP address is local or public
  if (!isLocalIp(user.ipAddress)) {
    return res.status(401).json({ message: "Come to college to attend!" });
  }

  let data = {
    userID: new mongoose.Types.ObjectId(user.userId),
    subjectID: new mongoose.Types.ObjectId(subjectID),
  };

  try {
    const subjectObject = await Subject.findById(subjectID);
    if (!subjectObject) {
      return res.status(404).json({ message: "Enteer valid subject" });
    }

    if(user.role === "teacher" && user.userId !== subjectObject.teacher){
        return res.status(404).json({ message: "You cannot attend this class" });
    }else{
      if (
        subjectObject.course !== user.course ||
        subjectObject.semester !== user.semester
      ) {
        return res.status(404).json({ message: "You cannot attend this class" });
      }
    }

    if (!subjectObject.startTime || !subjectObject.endTime) {
      return res
        .status(404)
        .json({ message: "Subject timing has not been defined" });
    }

    if (!checkRange(subjectObject.startTime, subjectObject.endTime)) {
      return res.status(401).json({ message: "You have missed the class" });
    }

    data.semesterID= new mongoose.Types.ObjectId(subjectObject.semester);
  } catch (err) {
    return res.status(404).json({ message: "Provide a valid id" });
  }

  //TODO : check if the attened time is within the time range

  try {
    // Check if the current date is a holiday
    const holidayDate = await Holiday.findOne({ date: new Date() });

    if (holidayDate) {
      return res.status(401).json({ message: "Today is holiday." });
    }

    if (!user.faculty || !user.course || !user.semester) {
      return res.status(401).json({message: "Please contact admin to get assigned to our course.",});
    }
    
    console.log(data);
    const newAttendance = new Attendance(data);
    await newAttendance.save();

    return res.status(200).json({ message: "you are present." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

// Function to check if an IP address is local
const isLocalIp = (ipAddress) => {
  // Check for loopback addresses (::1 and 127.0.0.1)
  if (ipAddress === "::1" || ipAddress === "127.0.0.1") {
    return true;
  }

  // Check for other private IP addresses
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

  // Extract hours and minutes from the current date
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();

  // Extract hours and minutes from the start and end ranges
  const startHour = timeStartRange.getHours();
  const startMinute = timeStartRange.getMinutes();
  const endHour = timeEndRange.getHours();
  const endMinute = timeEndRange.getMinutes();

  // Check if current time is within the range
  return (
    (currentHour > startHour ||
      (currentHour === startHour && currentMinute >= startMinute)) &&
    (currentHour < endHour ||
      (currentHour === endHour && currentMinute <= endMinute))
  );
};

module.exports = attend;