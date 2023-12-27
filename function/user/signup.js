const bcrypt = require('bcrypt');
const validator = require('validator');
const UserModel = require('../../model/userModel')

const Signup = async(req, res) => {
  try {
    const { firstName, middleName, lastName, email, username, password, dob, phoneNumber, address } = req.body;

    if (!firstName || !lastName || !email || !username || !password || !dob || !phoneNumber || !address) {
      return res.status(400).json({ message: "Please provide all the requied data!" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid Email Address! Please provide a valid email." });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = {
      firstName, lastName, email, username, password:hashedPassword, dob, phoneNumber, address
    }
    if(middleName){
      data.middleName= middleName;
    }

    // to check if the username or email already exists in the system or not 
    const checkUsernameExists = await UserModel.findOne({ $or: [{ username: username }, { email: email }] });
    if(checkUsernameExists){
      return res.status(401).json({"message":"Username or email already exists"});
    }

    //saving new user in the usermodel in mongodb
    const newUser = new UserModel(data);
    await newUser.save();

    //return success message after all the process are done
    return res.status(200).json({ message: "Signup Successful!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = Signup;
