const Hashing = require('../service/Hashing');
const Validation = require("../service/Validation");
const UserModel = require('../../model/userModel')

const Signup = async(req, res) => {
  try {
    const {username, password, firstName, middleName, lastName, email, phoneNumber, dob, address } = req.body;

    if (!username || !password || !firstName || !lastName || !email || !phoneNumber || !dob || !address) {
      return res.status(400).json({ message: "Please provide all the requied data!" });
    }

    if (Validation.checkEmail(email)) {
      return res.status(400).json({ message: "Invalid Email Address! Please provide a valid email." });
    }

    if(Validation.checkLength(firstName)){
      return res.status(400).json({message:"Please provide a valid first name"});
    }
    
    if(Validation.checkLength(middleName)){
      return res.status(400).json({message:"Please provide a valid middle name"});
    }
    
    if(Validation.checkLength(lastName)) {
      return res.status(400).json({message:"Please provide a valid last name"});
    }

    if(Validation.checkLength(phoneNumber,10,10)){
      return res.status(400).json({message:"Please provide a valid phone number"});
    }

    if(Validation.checkPassword(password)){
      return res.status(400).json({message:"Password must be one uppercase, one lowercase, one digit and one special character"});
    }
  
    const hashedPassword = await Hashing.hash(password);
    const data = {
      firstName, lastName, email, username, password:hashedPassword, dob, phoneNumber, address
    }
    if(middleName){
      data.middleName= middleName;
    }

    const checkUsernameExists = await UserModel.findOne({ $or: [{ username: username }, { email: email }] });
    if(checkUsernameExists){
      return res.status(401).json({"message":"Username or email already exists"});
    }

    const newUser = new UserModel(data);
    await newUser.save();

    return res.status(200).json({ message: "Signup Successful!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = Signup;