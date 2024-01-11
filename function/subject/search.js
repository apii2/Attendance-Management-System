const SubjectModel = require('../../model/subjectModel');

const searchSubject = async(req,res) =>{
  try {
    const {search}=req.params;

    const query = {
      $or:[
        {
          name: 
            { 
              $regex: new RegExp(`.*${search}.*`, 'i')
            }
        },
        {
          code:
            {
              $regex: new RegExp(`.*${search}.*`, 'i')
            }
        }
      ]
    };

    const searchData = search?
    await SubjectModel.find(query).populate("course").populate("teacher","-refreshToken -password -token").populate("semester"):
    await SubjectModel.find();
  
    return res.status(200).json(searchData);

  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Internal Server Error!"});
  }
} 

module.exports = searchSubject;