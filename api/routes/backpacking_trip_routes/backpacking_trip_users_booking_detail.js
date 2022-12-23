const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Backpacking_Trip_User_Booking_Detail=require('../../models/Backpacking_Trip/backpacking_trip_user_booking_detail');


router.post('/post_backpacking_trip_user_booking_detail',(req,res)=>{

    const backpacking_trip_user_booking_detail=new Backpacking_Trip_User_Booking_Detail({
        
        _id:mongoose.Types.ObjectId(),
        user_id:req.body.user_id,
        name:req.body.name,
        communication_channel:req.body.communication_channel,
        phone_number:req.body.phone_number,
        email:req.body.email,
        trip:req.body.trip,
        state:req.body.state,      
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
    backpacking_trip_user_booking_detail.extra_data_in_object_type['user_ns']=req.body.user_ns;
    
    backpacking_trip_user_booking_detail.save()
    .then(result1=>{

        const date='trip_date+no of days of package+1';

        if(month=='january' || month=='march' || month=='may' || month=='july' || month=='august' || month=='october' || month=='december')
        {
            if(date>31)
            {
                const newDate=date-31;
                const date1 = new Date(2022, 11, 20, 21, 01, 00).toLocaleString(undefined,{timeZone:'Asia/Kolkata'});
                    scheduler.scheduleJob('job1',date1,()=>{
                        console.log('heelkk');
                        scheduler.cancelJob('job1');
                    });
            }

            else if(date<31)
            {
                const date1 = new Date(2022, 11, 20, 21, 01, 00).toLocaleString(undefined,{timeZone:'Asia/Kolkata'});
                    scheduler.scheduleJob('job1',date1,()=>{
                        console.log('heelkk');
                        scheduler.cancelJob('job1');
                    });

            }
        }

        else if(month=='april' || month=='june' || month=='september' || month=='november')
        {

            if(date>30)
            {
                const newDate=date-30;
                const date1 = new Date(2022, 11, 20, 21, 01, 00).toLocaleString(undefined,{timeZone:'Asia/Kolkata'});
                    scheduler.scheduleJob('job1',date1,()=>{
                        console.log('heelkk');
                        scheduler.cancelJob('job1');
                    });
            }

            else if(date<30)
            {
                const date1 = new Date(2022, 11, 20, 21, 01, 00).toLocaleString(undefined,{timeZone:'Asia/Kolkata'});
                    scheduler.scheduleJob('job1',date1,()=>{
                        console.log('heelkk');
                        scheduler.cancelJob('job1');
                    });

            }

        }

        else if(month=='february' && year!="2024" || year!='2028')
        {
            if(date>31)
            {
                const newDate=date-31;
                const date1 = new Date(2022, 11, 20, 21, 01, 00).toLocaleString(undefined,{timeZone:'Asia/Kolkata'});
                    scheduler.scheduleJob('job1',date1,()=>{
                        console.log('heelkk');
                        scheduler.cancelJob('job1');
                    });
            }

            else if(date<31)
            {

                const newDate=date-31;
                const date1 = new Date(2022, 11, 20, 21, 01, 00).toLocaleString(undefined,{timeZone:'Asia/Kolkata'});
                    scheduler.scheduleJob('job1',date1,()=>{
                        console.log('heelkk');
                        scheduler.cancelJob('job1');
                    });

            }
        }

      



    

    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });

});





module.exports=router;