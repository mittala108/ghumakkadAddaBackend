const mongoose=require('mongoose');




const phone_number_verification=mongoose.Schema({
    phone_number:{type:String},
    otp:{type:Number}
});


 module.exports=mongoose.model('Phone_Number_Verification',phone_number_verification);