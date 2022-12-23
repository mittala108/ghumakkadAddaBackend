const express=require('express');
const router=express.Router();
const Razorpay=require('razorpay');
const mongoose=require('mongoose');
const Payment=require('../../models/payments_related_models/payment');
const fetch = require('node-fetch');

var instance = new Razorpay({ key_id: 'rzp_test_nb1AYTw8yqhy68', key_secret: '3vuOI64r8EI57rPzDzxpZtbo' });






router.get('/call_back_url/:user_ns/:amount/:customerPhoneNumber/:customerEmail',(req,res)=>{

        instance.payments.fetch(req.query.razorpay_payment_id)
        .then(data=>{
            if(data.status=='captured')
            {
                console.log('jjjjjjj');
                const payment=new Payment({

                    _id:new mongoose.Types.ObjectId(),
                    razorpay_payment_Id:req.query.razorpay_payment_id,
                    razorpay_signature:req.query.razorpay_signature,
                    date_of_payment:new Date(),
                    customer_phone_number:req.params.customerPhoneNumber,
                    razorpay_order_Id:data.order_id,
                    customer_email:req.params.customerEmail,
                    amount:parseInt(req.params.amount,10)
                });

                payment.save()
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
        callback_url: `http://localhost:8000/admin/sub_routes/payment_related_routes/payments/call_back_url/${req.body.user_ns}/${req.body.totalAmountOfTrip}/${req.body.customerPhoneNumber}/${req.body.customerEmail}`,
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