var notification=require('../models/notification.js');


//function used to get data from databse
exports.getAll=function(req,res){
  notification.find({})
  .exec(function(error,notification){
    if(error){
      res.status(500).send({
        message:error
      });
    }else{
    res.status(200).send(notification);
    }
  })
}

//function used to post some data in database
exports.add=function(req,res){
  var params = req.body;
 if(params.name==undefined || params.email==undefined || params.password==undefined){
   res.status(404).send({
     message:'one or more perameters missing'
   });
 }else{
  new notification({
    sentTo:params.sentTo,
    department:params.department,
    degree:params.degree,
    semester:params.semester
  }).save();
  res.end();
}
}

//function used to edit some data in database
exports.edit=function(req,res){
  if(req.params.id==undefined){
    res.status(404).send({
      message:'one or more perameters missing'
    });
  }else{
    notification.findOne({_id:req.params.id}).exec(function(error,notification){
    //  console.log(notification);
      notification.name=req.body.name?req.body.name:notification.name;
      notification.email=req.body.email?req.body.email:notification.email;
      notification.password=req.body.password?req.body.password:notification.password;
      notification.role=req.body.role?req.body.role:notification.role;
      notification.save(function(error,notification){
        if(error){
          res.status('500').send({message:'error found'})
        }else{
          res.status('202').send({message:'updated'})
        }
      });
    })
 }
}

//function used to delete some data from database
exports.delete=function(req,res){
  if(req.params.id==undefined){
    res.status(404).send({
      message:'one or more perameters missing'
    });
  }else{
    notification.findOne({_id:req.params.id}).exec(function(error,notification){
      console.log(notification);
      if(notification.isDeleted==false){
        notification.isDeleted=true;
      }
      notification.save(function(error,notification){
        if(error){
          res.status('500').send({message:'error found'})
        }else{
          res.status('202').send({message:'deleted'})
        }
      });
    })
 }
}


//function to check the deleted notifications from the system
// exports.checkDeleted=function(req,res){
//   notification.find({"notification.isDeleted":false})
//   .exec(function(error,notification){
//     if(error){
//       res.status(500).send({
//         message:error
//       });
//     }else{
//       console.log(notification);
//     res.status(200).send(notification);
//     }
//   })

//  res.send(notification);
//}
