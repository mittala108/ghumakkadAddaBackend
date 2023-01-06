const express=require('express');
const router=express.Router();
const Razorpay=require('razorpay');
const mongoose=require('mongoose');
const Backpacking_Trip_Payment_Detail=require('../../models/Backpacking_Trip/backpacking_trip_payment_detail');
const fetch = require('node-fetch');

var instance = new Razorpay({ key_id: 'rzp_test_nb1AYTw8yqhy68', key_secret: '3vuOI64r8EI57rPzDzxpZtbo' });


router.get('/get_all_payment_details',(req,res)=>{
    Backpacking_Trip_Payment_Detail.find()
    .populate({
        path:'backpacking_trip_package_id',
            populate:{
                path:'backpacking_trip_travel_mode_id',
                model:'Backpacking_Trip_Travel_Mode',
                populate:{
                    path:'backpacking_trip_common_city_id',
                    model:'Backpacking_Trip_Common_City',
                    populate:{
                        path:'backpacking_trip_state_id',
                        model:'Backpacking_Trip_State'
                    }
                }         
            }
    })
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



router.get('/call_back_url/:user_ns/:amount/:customerPhoneNumber/:customerEmail/:backpacking_trip_package_id',(req,res)=>{

        instance.payments.fetch(req.query.razorpay_payment_id)
        .then(data=>{
            if(data.status=='captured')
            {
                console.log('jjjjjjj');
                const newData=new Backpacking_Trip_Payment_Detail({

                    _id:new mongoose.Types.ObjectId(),
                    backpacking_trip_package_id:req.params.backpacking_trip_package_id,
                    razorpay_payment_id:req.query.razorpay_payment_id,
                    razorpay_signature:req.query.razorpay_signature,
                    date_of_payment:new Date(),
                    razorpay_invoice_id:req.query.razorpay_invoice_id,
                    customer_phone_number:req.params.customerPhoneNumber,
                    razorpay_order_id:data.order_id,
                    customer_email:req.params.customerEmail,
                    amount:parseInt(req.params.amount,10)
                });

                newData.save()
                .then(result=>{

                    console.log('payment success');

                    const jsonPayLoad={
                        "user_ns":req.params.user_ns,
                        "razorpay_payment_Id":req.query.razorpay_payment_id,
                        "order_Id":data.order_id,
                        "payment_Id":result._id
                    };


                    fetch('https://www.uchat.com.au/api/iwh/1971d09d8c28e042e424188499eed502',{
                        method:'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body:JSON.stringify(jsonPayLoad)
                    })
                    .then(response=>{

                        res.render('payment_success',{razorpay_payment_Id:req.query.razorpay_payment_id});
                        
                        
                    });
                });
            }
            else if(data.status=='failed')
            {
                const jsonPayLoad={
                    "user_ns":req.params.user_ns
                };


                fetch('https://www.uchat.com.au/api/iwh/d472f2fd1e6bbfd51152735badc06136',{
                    method:'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body:JSON.stringify(jsonPayLoad)
                })
                .then(response=>{
                    res.render('payment_failure');          
                });
               
            }
        })
        .catch(err=>{
            res.json({
                error:err
            });
        });  
});


router.get('/getPaymentLink',(req,res)=>{

    const date=new Date();
    const unixTimestamp = Math.floor(date.getTime() / 1000);

    instance.invoices.create({
        type: "invoice",
        date: unixTimestamp,
        partial_payment:false,
        customer:{
            "name":req.body.customerName,
            "contact":req.body.customerPhoneNumber,
            "email":req.body.customerEmail
        },
        line_items: [
            {
                "name":`${req.body.package_name},${req.body.package_no_of_days}`,
                "amount":parseInt(req.body.cost_of_package,10)*100,
                "currency": "INR",
                "quantity":parseInt(req.body.no_of_bookings,10)
            }
        ],
        sms_notify:1,
        email_notify:1,
        callback_url: `http://localhost:8000/admin/sub_routes/backpacking_trip_related_routes/backpacking_trip_payment_details/call_back_url/${req.body.user_ns}/${req.body.totalAmountOfTrip}/${req.body.customerPhoneNumber}/${req.body.customerEmail}/${req.body.backpacking_trip_package_id}`,
        callback_method: "get"
      })
      .then(response=>{
        res.json({
            response:response
        });
      })
      .catch(err=>{
        res.json({
            error:err
        });
      });

        
        // instance.paymentLink.create({
        // amount: parseInt(req.params.totalAmountOfTrip,10)*100,
        // currency: "INR",
        // customer: {
        //     name: req.params.customerName,         
        //     contact:req.params.customerPhoneNumber
        // },
        // callback_url: `https://ghumakkad-adda.herokuapp.com/admin/sub_routes/payment_related_routes/payments/call_back_url/${req.params.user_ns}/${req.params.totalAmountOfTrip}/${req.params.customerPhoneNumber}`,
        // callback_method: "get"
        // })
        // .then(response=>{
        //     res.json({
        //         short_url:response.short_url,
        //         paymentLinkId:response.id,
        //         status:response.status,
            
        //     });
        // })
        // .catch(error=>{
        //     console.log(error);
        // });

        
});



module.exports=router;