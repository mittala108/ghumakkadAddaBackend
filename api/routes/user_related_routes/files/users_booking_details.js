const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const User_Booking_Detail=require('../../../models/User/user_booking_details');


router.post('/user_booking_details',(req,res)=>{

    const newData=new User_Booking_Detail({

        _id:mongoose.Types.ObjectId(),
        user_id:req.body.user_id,
        booking_id:req.body.booking_id,
        booking_id_model:req.body.booking_id_model
    });

    newData.save()
    .then(result=>{
        res.json({
            message:'data saved successfully'
        });
    })
    .catch(err=>{
        res.json({
            error:err
        });
    });
});


router.get('get_all_user_booking_details/:user_id',(req,res)=>{

    User_Booking_Detail.find({user_id:req.params.user_id})
    .populate('booking_id user_id')
    .exec
    .then(result=>{
        res.json({
            result:result
        });
    })
    .catch(err=>{
        res.json({
            error:err
        });
    });
});



module.exports=router;