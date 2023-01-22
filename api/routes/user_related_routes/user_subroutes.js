const express=require('express');
const router=express.Router();


//user_related_routes
const users_information=require('./files/users_information');
const users_booking_details=require('./files/users_booking_details');




//user_related_routes
router.use('/users_information',users_information);
router.use('/users_booking_details',users_booking_details);



module.exports=router;