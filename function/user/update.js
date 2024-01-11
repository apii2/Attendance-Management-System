const userModel = require('../../model/userModel');
const bcrypt = require('bcrypt');
const Hashing = require('../service/Hashing');

const update = async(req,res) =>{
  try{
    const user = req.user;
    const {id} = req.params;

    if(!id) {
      return res.status(404).json({message:"Invalid request"});
    }

    if(user.userId !== id && user.role !== "admin"){
      return res.status(404).json({message:"Invalid access!"});
    }

    const {username, password, firstName,middleName,lastName,email, phoneNumber, dob,address} = req.body;

    const userData = await userModel.findById(id);

    if(!userData) {
      return res.status(404).json({message:"User not found!"});
    }

    if(username){
      userData.username = username;
    }

    if(password){
      userData.password = await Hashing.hash(password);
    }

    if(firstName && user.role==="admin") {
      userData.firstName = firstName;
    }

    if(middleName && user.role==="admin") {
      userData.middleName = middleName;
    }

    if(lastName && user.role==="admin") {
      userData.lastName = lastName;
    }

    if(email && user.role==="admin") {
      userData.email = email;
    }

    if(phoneNumber && user.role==="admin") {
      userData.phoneNumber = phoneNumber;
    }

    if(dob && user.role==="admin") {
      userData.dob = dob;
    }

    if(address && user.role==="admin") {
      userData.address = address;
    }

    await userData.save();

    return res.status(200).json({message:"User has been updated successfully!"});

  } catch(error) {
    console.log(error);
    return res.status(500).json({message:"Internal Server Error!"});
  }
}

module.exports = update;