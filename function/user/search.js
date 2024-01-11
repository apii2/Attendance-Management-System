const userModel = require('../../model/userModel');

const search = async(req,res) =>{
  try{
    const {search} = req.params;

    if(!search) {
      return res.status(404).json({message:"Invalid request!"});
    }

    const query = {
      $or:[
        {
          username: { 
            $regex: new RegExp(`.*${search}.*`, 'i')
          }
        },
        {
          firstName: { 
            $regex: new RegExp(`.*${search}.*`, 'i')
          }
        },
        {
          middleName: { 
            $regex: new RegExp(`.*${search}.*`, 'i')
          }
        },
        {
          lastName: { 
            $regex: new RegExp(`.*${search}.*`, 'i')
          }
        },
        {
          email: { 
            $regex: new RegExp(`.*${search}.*`, 'i')
          }
        }, {
          phoneNumber: { 
            $regex: new RegExp(`.*${search}.*`, 'i')
          }
        },   
        {
          address: { 
            $regex: new RegExp(`.*${search}.*`, 'i')
          }
        }
      ]
    }; 

    const UserData = query?
    await userModel.find(query): 
    await userModel.find();

    return res.status(200).json(UserData);
  } catch(error) {
    console.log(error);
    return res.status(500).json({message: "Internal Server Error!"});
  }
}

module.exports = search;