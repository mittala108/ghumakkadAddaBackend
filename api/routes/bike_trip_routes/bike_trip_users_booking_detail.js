const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Bike_Trip_User_Booking_Detail=require('../../models/Bike_Trip/bike_trip_user_booking_detail');


router.post('/post_bike_trip_user_booking_detail',(req,res)=>{

    const bike_trip_user_booking_detail=new Bike_Trip_User_Booking_Detail({
        
        _id:mongoose.Types.ObjectId(),
        user_id:req.body.user_id,
        name:req.body.name,
        communication_channel:req.body.communication_channel,
        phone_number:req.body.phone_number,
        email:req.body.email,      
        common_city:req.body.common_city,
        package_id:req.body.package_id,
        date_of_journey:req.body.date_of_journey,
        no_of_bookings:req.body.no_of_bookings,
        total_amount_paid:req.body.total_amount_paid,
        cost_of_package:req.body.cost_of_package,
        date_of_booking:req.body.date_of_booking,
        payment_details_id:req.body.payment_details_id,
        razorpay_payment_id:req.body.razorpay_payment_id,
        razorpay_order_id:req.body.razorpay_order_id,   
        razorpay_invoice_id:req.body.razorpay_invoice_id

    
    });
    bike_trip_user_booking_detail.extra_data_in_object_type['user_ns']=req.body.user_ns;
    
    bike_trip_user_booking_detail.save()
    .then(result1=>{
        res.status(200).json({
            message:"user_booking_details_added_successfully",
            result1:result1
        });

    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });

});





module.exports=router;