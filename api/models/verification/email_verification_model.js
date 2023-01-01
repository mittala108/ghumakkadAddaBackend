const mongoose=require('mongoose');



const email_verification=mongoose.Schema({

    email:{type:String},
    otp:{type:Number}
});



module.exports=mongoose.model('Email_Verification',email_verification);