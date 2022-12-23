const express=require('express');
const router=express.Router();
const nodemailer=require('nodemailer');
const Email_Verification=require('../../models/email_verification/email_verification_model');
const scheduler=require('node-schedule');



router.get('/send_otp_to_the_email/:email',(req,res)=>{

    //const date1 = new Date(2022, 11, 20, 21, 01, 00).toLocaleString(undefined,{timeZone:'Asia/Kolkata'});

    const email=req.params.email;

    const otp=Math.floor(1000+Math.random()*9000);

    const email_verification=new Email_Verification({
        email:email,
        otp:otp
      });

      email_verification.save()
      .then(result=>{
        res.json({
            message:"data saved on server successfully",
            result:result,
            data:`${process.env.EMAIL_ID},${process.env.EMAIL_PASSWORD}`
        });
      })
      .catch(err=>{
        res.json({
            error:err
        });
      });

    scheduler.scheduleJob('job1',"10 * * * * *",()=>{

        Email_Verification.deleteOne({email:req.params.email})
            .exec()
            .then(result=>{
                console.log('otp is expired,so record is deleted');
                scheduler.cancelJob('job1');
            })
            .catch(err=>{
                res.json({
                    error:err
                });
            });
    });

    

});



module.exports=router;