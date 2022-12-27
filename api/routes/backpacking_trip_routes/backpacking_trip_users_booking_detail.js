const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Backpacking_Trip_User_Booking_Detail=require('../../models/Backpacking_Trip/backpacking_trip_user_booking_detail');

router.post('/post_backpacking_trip_user_booking_detail',(req,res)=>{

    const date_of_journey=new Date(req.body.date_of_journey);
    const getFullYear=parseInt(date_of_journey.getFullYear(),10);
    const getDate=parseInt(date_of_journey.getDate(),10);
    const getMonth=parseInt(date_of_journey.getMonth(),10);
    const package_no_of_days=String(req.body.package_no_of_days);
    const package_date=parseInt(package_no_of_days.charAt(2),10);


    const backpacking_trip_user_booking_detail=new Backpacking_Trip_User_Booking_Detail({
        
        _id:mongoose.Types.ObjectId(),
        user_id:req.body.user_id,
        name:req.body.name,
        communication_channel:req.body.communication_channel,
        phone_number:req.body.phone_number,
        email:req.body.email,
        state:req.body.state,      
        common_city:req.body.common_city,
        package_id:req.body.package_id,
        date_of_journey:date_of_journey,
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


        const number_nm=getDate+package_date+1;

        if(getMonth==0 || getMonth==2 || getMonth==4 || getMonth==6 || getMonth==7 || getMonth==9 || getMonth==11)
        {
            if(number_nm>31)
            {
                const newDate=number_nm-31;
                const date1 = new Date(getFullYear,getMonth,newDate,12, 00, 00).toLocaleString(undefined,{timeZone:'Asia/Kolkata'});
                    scheduler.scheduleJob('job1',date1,()=>{
                        console.log('heelkk');
                        scheduler.cancelJob('job1');
                    });
            }

            else if(number_nm<31)
            {
                const date1 = new Date(getFullYear,getMonth,number_nm,12, 00, 00).toLocaleString(undefined,{timeZone:'Asia/Kolkata'});
                    scheduler.scheduleJob('job1',date1,()=>{
                        console.log('heelkk');
                        scheduler.cancelJob('job1');
                    });

            }
        }

        else if(getMonth==3 || getMonth==5 || getMonth==8 || getMonth==10)
        {

            if(number_nm>30)
            {
                const newDate=number_nm-30;
                const date1 = new Date(getFullYear,getMonth,newDate,12, 00, 00).toLocaleString(undefined,{timeZone:'Asia/Kolkata'});
                    scheduler.scheduleJob('job1',date1,()=>{
                        console.log('heelkk');
                        scheduler.cancelJob('job1');
                    });
            }

            else if(number_nm<30)
            {
                const date1 = new Date(getFullYear,getMonth,number_nm,12, 00, 00).toLocaleString(undefined,{timeZone:'Asia/Kolkata'});
                    scheduler.scheduleJob('job1',date1,()=>{
                        console.log('heelkk');
                        scheduler.cancelJob('job1');
                    });

            }

        }

        else if(getMonth==1 && getFullYear!="2024" || getFullYear!='2028')
        {
            if(number_nm>28)
            {
                const newDate=number_nm-28;
                const date1 = new Date(getFullYear,getMonth,newDate,12, 00, 00).toLocaleString(undefined,{timeZone:'Asia/Kolkata'});
                    scheduler.scheduleJob('job1',date1,()=>{
                        console.log('heelkk');
                        scheduler.cancelJob('job1');
                    });
            }

            else if(number_nm<28)
            {

    
                const date1 = new Date(getFullYear,getMonth,number_nm,12, 00, 00).toLocaleString(undefined,{timeZone:'Asia/Kolkata'});
                    scheduler.scheduleJob('job1',date1,()=>{
                        console.log('heelkk');
                        scheduler.cancelJob('job1');
                    });

            }
        }

        else if(getMonth==1 && getFullYear=="2024" || getFullYear=='2028')
        {
            if(number_nm>29)
            {
                const newDate=number_nm-29;
                const date1 = new Date(getFullYear,getMonth,newDate,12, 00, 00).toLocaleString(undefined,{timeZone:'Asia/Kolkata'});
                    scheduler.scheduleJob('job1',date1,()=>{
                        console.log('heelkk');
                        scheduler.cancelJob('job1');
                    });
            }

            else if(number_nm<29)
            {

    
                const date1 = new Date(getFullYear,getMonth,number_nm,12, 00, 00).toLocaleString(undefined,{timeZone:'Asia/Kolkata'});
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