const express=require('express');
const router=express.Router();
const Razorpay=require('razorpay');
const mongoose=require('mongoose');
const Payment_Detail=require('../../../models/Backpacking_Trip/ByRoad/payment_detail');
const fetch = require('node-fetch');

var instance = new Razorpay({ key_id: 'rzp_test_nb1AYTw8yqhy68', key_secret: '3vuOI64r8EI57rPzDzxpZtbo' });


router.get('/get_all_payment_details_fields',(req,res)=>{
    Payment_Detail.find()
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



router.get('/call_back_url/:user_ns',(req,res)=>{

        instance.payments.fetch(req.query.razorpay_payment_id)
        .then(data=>{
            if(data.status=='captured')
            {
                const newData=new Payment_Detail({

                    _id:new mongoose.Types.ObjectId(),
                    razorpay_payment_id:req.query.razorpay_payment_id,
                    razorpay_signature:req.query.razorpay_signature,
                    date_of_payment:new Date(),
                    razorpay_invoice_id:req.query.razorpay_invoice_id,
                    razorpay_order_id:data.order_id,
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
        callback_url: `http://localhost:7000/api/backpacking_trip_related_routes/by_road_travel_mode/payment_details/call_back_url/${req.body.user_ns}`,
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