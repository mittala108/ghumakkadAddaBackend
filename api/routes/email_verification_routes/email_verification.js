const express=require('express');
const router=express.Router();
const Email_Verification=require('../../models/email_verification/email_verification_model');
const scheduler=require('node-schedule');



router.get('/send_otp_to_the_email/:email',(req,res)=>{

    //const date1 = new Date(2022, 11, 20, 21, 01, 00).toLocaleString(undefined,{timeZone:'Asia/Kolkata'});

    const email=req.params.email;

    const otp=Math.floor(100000+Math.random()*900000);

    const email_verification=new Email_Verification({
        email:email,
        otp:otp
      });

      email_verification.save()
      .then(result=>{

        scheduler.scheduleJob('job1',"* 10 * * * *",()=>{

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
});


router.get('/verify_otp_email/:email/:otp',(req,res)=>{

    Email_Verification.find({email:req.params.email})
    .exec()
    .then(result=>{
        if(result.length==0)
        {
            return res.json({
                otp_expired:1,
                otp_matched:0,
                message:'otp has been expired'
            });
        }

        else
        {
            if(result[0].otp==req.params.otp)
            {
                return res.json({
                    otp_expired:0,
                    otp_matched:1
                });
            }

            else if(result[0].otp!=req.params.otp)
            {
                return res.json({
                    otp_expired:0,
                    otp_matched:0
                });
            }

        }
    })
    .catch(err=>{
        res.json({
            error:err
        });
    });

});



module.exports=router;