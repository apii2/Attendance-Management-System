const subjectModel = require("../../model/subjectModel");

const setTimer = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json({ message: "Provide id!" });
  }
  const { startTime, endTime } = req.body;

  if (
    !startTime ||
    !endTime ||
    !startTime.hour ||
    !startTime.minute ||
    !endTime.hour ||
    !endTime.minute
  ) {
    return res.status(404).json({ message: "Provide a valid data" });
  }

  const startingTime = new Date();
  startingTime.setHours(startTime.hour);
  startingTime.setMinutes(startTime.minute);

  const endingTime = new Date();
  endingTime.setHours(endTime.hour);
  endingTime.setMinutes(endTime.minute);

  if (startingTime > endingTime) {
    return res.status(400).json({ message: "Invalid time format!" });
  }
  try {
    const subjectObject = await subjectModel.findById(id);

    subjectObject.startTime = startingTime;
    subjectObject.endTime = endingTime;
    await subjectObject.save();

    return res.status(200).json({ message: "Added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Invalid id" });
  }
};

module.exports = setTimer;