const express=require('express');
const router=express.Router();


//payment_related_routes
const payment_details=require('./files/payment_details');



//payment_related_routes
router.use('/payment_details',payment_details);



module.exports=router;