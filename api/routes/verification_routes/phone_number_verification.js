const express=require('express');
const router=express.Router();
const Phone_Number_Verification=require('../../models/verification/phone_number_verification_model');
const scheduler=require('node-schedule');
const { v4: uuidv4 } = require('uuid');



router.get('/send_otp_to_the_phone_number/:phone_number/:user_ns',(req,res)=>{

    //const date1 = new Date(2022, 11, 20, 21, 01, 00).toLocaleString(undefined,{timeZone:'Asia/Kolkata'});
     
    Phone_Number_Verification.find({phone_number:req.params.phone_number})
    .exec()
    .then(result=>{
        if(result.length==0)
        {
            const phone_number=req.params.phone_number;

            const otp=Math.floor(100000+Math.random()*900000);

            const phone_number_verification=new Phone_Number_Verification({
                phone_number:phone_number,
                otp:otp
            });

            phone_number_verification.save()
            .then(result1=>{
                const job=uuidv4();
                scheduler.scheduleJob(`${job}`,"* */10 * * * *",()=>{
                
                    Phone_Number_Verification.deleteOne({phone_number:req.params.phone_number})
                    .exec()
                    .then(result=>{
                        console.log('otp is expired,so record is deleted');
                        scheduler.cancelJob(`${job}`);
                    });

                    //send webhook to user when otp will be expired
                    // fetch()
                    // .then
                    // .catch()
                        
                });

                res.json({
                    message:"data saved on server successfully",
                    result:result1,
                    phone_number_in_verification_database:0
                });
            })
            .catch(err=>{
                res.json({
                    error:err
                });
            });

        }

        else{

            res.json({
                message:'phone  number already exist and otp has already been sent to this phone number',
                result:result,
                phone_number_in_verification_database:1
            });

        }
    })
    .catch(err=>{
        res.json({
            error:err
        });
    });
});


router.get('/verify_otp_phone_number/:phone_number/:otp',(req,res)=>{

    Phone_Number_Verification.find({phone_number:req.params.phone_number})
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
                Phone_Number_Verification.deleteOne({phone_number:req.params.phone_number})
                .exec()
                
                 res.json({
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


router.delete('/delete_otp_from_phone_number_verification_record/:phone_number',(req,res)=>{

    Phone_Number_Verification.deleteOne({phone_number:req.params.phone_number})
    .exec()
    .catch(err=>{
        res.json({
            error:err
        });
    });
});


module.exports=router;