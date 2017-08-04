//include modules
var mongoose=require('mongoose');

var NotificationSchema=new mongoose.Schema({
  message:{type:String,required:true},
  department:{type:String},
  degree:{type:String},
  semester:{type:String},
  sentTo:{type:String,default:null}
});
module.exports=mongoose.model('Notification',NotificationSchema);
