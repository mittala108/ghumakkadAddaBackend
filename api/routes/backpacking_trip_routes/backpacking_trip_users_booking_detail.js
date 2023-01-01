const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Backpacking_Trip_User_Booking_Detail=require('../../models/Backpacking_Trip/backpacking_trip_user_booking_detail');
const fetch=require('node-fetch');
const scheduler=require('node-schedule');
const { v4: uuidv4 } = require('uuid');
var randomstring = require("randomstring");

router.get('/get_backpacking_trip_user_booking_details',(req,res)=>{

    Backpacking_Trip_User_Booking_Detail.find()
    .populate('backpacking_trip_package_id')
    .exec()
    .then(result=>{
        res.json({
            data:result,
            count:result.length
        });
    })
    .catch(err=>{
        res.json({
            error:err
        });
    });
});


router.post('/post_backpacking_trip_user_booking_detail',(req,res)=>{

    const date_of_journey=new Date(req.body.date_of_journey);
    const getFullYear=parseInt(date_of_journey.getFullYear(),10);
    const getDate=parseInt(date_of_journey.getDate(),10);
    const getMonth=parseInt(date_of_journey.getMonth(),10);
    const package_no_of_days=String(req.body.package_no_of_days);
    const package_date=parseInt(package_no_of_days.charAt(3),10);

    const actual_user_booking_id='GA'+String(randomstring.generate({
        length:12,
        charset:'numeric'
    }));


    const backpacking_trip_user_booking_detail=new Backpacking_Trip_User_Booking_Detail({
        
        _id:mongoose.Types.ObjectId(),
        user_id:req.body.user_id,
        booking_id:actual_user_booking_id,
        name:req.body.name,
        communication_channel:req.body.communication_channel,
        phone_number:req.body.phone_number,
        email:req.body.email,
        state:req.body.state,      
        common_city:req.body.common_city,
        backpacking_trip_package_id:req.body.backpacking_trip_package_id,
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

        if(getMonth==0 || getMonth==2 || getMonth==4 || getMonth==6 || getMonth==7 || getMonth==9)
        {
            if(number_nm>31)
            {
                const newDate=number_nm-31;
                const newMonth=getMonth+1;
                const date1 = new Date(getFullYear,newMonth,newDate,12, 00, 00);
                console.log(date1);
                console.log('1');
                const job=uuidv4();
                    scheduler.scheduleJob(`${job}`,date1,()=>{
                        sendReviewMessageToCustomer(req.body.user_ns);
                        scheduler.cancelJob(`${job}`);
                    });
            }

            else if(number_nm<=31)
            {
                const date1 = new Date(getFullYear,getMonth,number_nm,12, 00, 00);
                console.log(date1);
                console.log('2');
                const job=uuidv4();
                scheduler.scheduleJob(`${job}`,date1,()=>{
                    sendReviewMessageToCustomer(req.body.user_ns);
                    scheduler.cancelJob(`${job}`);
                });

            }
        }

        else if(getMonth==3 || getMonth==5 || getMonth==8 || getMonth==10)
        {

            if(number_nm>30)
            {
                const newDate=number_nm-30;
                const newMonth=getMonth+1;
                const date1 = new Date(getFullYear,newMonth,newDate,12, 00, 00);
                console.log(date1);
                console.log('3');
                const job=uuidv4();
                scheduler.scheduleJob(`${job}`,date1,()=>{
                    sendReviewMessageToCustomer(req.body.user_ns);
                    scheduler.cancelJob(`${job}`);
                });
            }

            else if(number_nm<=30)
            {
                const date1 = new Date(getFullYear,getMonth,number_nm,12, 00, 00);
                console.log(date1);
                console.log('4');
                const job=uuidv4();
                scheduler.scheduleJob(`${job}`,date1,()=>{
                    sendReviewMessageToCustomer(req.body.user_ns);
                    scheduler.cancelJob(`${job}`);
                });

            }

        }

        else if(getMonth==1)
        {
            if(getFullYear==2024 || getFullYear==2028)
            {
                if(number_nm>29)
                    {
                        const newDate=number_nm-29;
                        const newMonth=getMonth+1;
                        const date1 = new Date(getFullYear,newMonth,newDate,12, 00, 00);
                        console.log(date1);
                        console.log('7');
                        const job=uuidv4();
                        scheduler.scheduleJob(`${job}`,date1,()=>{
                            sendReviewMessageToCustomer(req.body.user_ns);
                            scheduler.cancelJob(`${job}`);
                        });
                    }

                else if(number_nm<=29)
                    {

            
                        const date1 = new Date(getFullYear,getMonth,number_nm,12, 00, 00);
                        console.log(date1);
                        console.log('8');
                        const job=uuidv4();
                        scheduler.scheduleJob(`${job}`,date1,()=>{
                            sendReviewMessageToCustomer(req.body.user_ns);
                            scheduler.cancelJob(`${job}`);
                        });

                    }

            }
            else
            {
                if(number_nm>28)
                {
                    const newDate=number_nm-28;
                    const newMonth=getMonth+1;
                    const date1 = new Date(getFullYear,newMonth,newDate,12, 00, 00);
                    console.log(date1);
                    console.log('5');
                    const job=uuidv4();
                    scheduler.scheduleJob(`${job}`,date1,()=>{
                        sendReviewMessageToCustomer(req.body.user_ns);
                        scheduler.cancelJob(`${job}`);
                    });
                }
    
                else if(number_nm<=28)
                {    
                    const date1 = new Date(getFullYear,getMonth,number_nm,12, 00, 00);
                    console.log(date1);
                    console.log('6');
                    const job=uuidv4();
                    scheduler.scheduleJob(`${job}`,date1,()=>{
                        sendReviewMessageToCustomer(req.body.user_ns);
                        scheduler.cancelJob(`${job}`);
                    });
    
                }
                
            }
           
        }

        else if(getMonth==11)
        {
            if(number_nm>31)
                {
                    const newDate=number_nm-31;
                    const newMonth=0;
                    const newFullYear=getFullYear+1;
                    const date1 = new Date(newFullYear,newMonth,newDate,12, 00, 00);
                    console.log(date1);
                    console.log('9');
                    const job=uuidv4();
                    scheduler.scheduleJob(`${job}`,date1,()=>{
                        sendReviewMessageToCustomer(req.body.user_ns);
                        scheduler.cancelJob(`${job}`);
                    });
                }
    
                else if(number_nm<=31)
                {    
                    const date1 = new Date(getFullYear,getMonth,number_nm,12, 00, 00);
                    console.log(date1);
                    console.log('10');
                    const job=uuidv4();
                    scheduler.scheduleJob(`${job}`,date1,()=>{
                        sendReviewMessageToCustomer(req.body.user_ns);
                        scheduler.cancelJob(`${job}`);
                    });
    
                }           
        }

        res.json({
            message:result1
        });
             
    })
    .catch(err=>{
        res.json({
            error:err
        });
    });

});


const sendReviewMessageToCustomer=(user_ns)=>{

    const jsonPayLoad={
        "user_ns":user_ns
    };


    fetch('https://www.uchat.com.au/api/iwh/1971d09d8c28e042e424188499eed502',{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(jsonPayLoad)
    })
    .then(response=>{

    });
}





module.exports=router;