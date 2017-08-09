var feedback=require('../models/feedback.js');


//function used to get data from databse
exports.getAll=function(req,res){
  feedback.find({})
  .exec(function(error,feedback){
    if(error){
      res.status(500).send({
        message:error
      });
    }else{
    res.status(200).send(feedback);
    }
  })
}

//function used to post some data in database
exports.add=function(req,res){
    var params = req.body;
 if(params.feedback==undefined){
   res.status(404).send({
     message:'one or more perameters missing'
   });
 }else{
  new feedback({
    feedback:params.feedback,
    userID:req.user._id
  }).save();
  res.end();
}
}

//function used to edit some data in database
exports.edit=function(req,res){
    var params = req.body;
  if(req.params.id==undefined){
    res.status(404).send({
      message:'one or more perameters missing'
    });
  }else{
    feedback.findOne({_id:req.params.id}).exec(function(error,feedback){
      feedback.feedback=params.feedback?params.name:feedback.feedback;
      feedback.userID=params.userID?params.userID:feedback.userID;
      feedback.save(function(error,feedback){
        if(error){
          res.status('500').send({message:'error found'})
        }else{
          res.status('202').send({message:'updated'})
        }
      });
    })
 }
}



