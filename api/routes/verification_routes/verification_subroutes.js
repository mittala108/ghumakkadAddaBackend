const express=require('express');
const router=express.Router();


//verification_related_routes
const email_verification=require('./files/email_verification');
const phone_number_verification=require('./files/phone_number_verification');




//verification_related_routes
router.use('/email_verification',email_verification);
router.use('/phone_number_verification',phone_number_verification);



module.exports=router;