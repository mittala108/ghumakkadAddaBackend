const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const User=require('../../models/user_models/user');


router.get('/check_if_user_data_is_saved_in_database',(req,res,next)=>{
    

    User.find({email:req.body.email})
    .exec()
    .then(doc=>{
        if(doc.length)
        {
            res.json({
                result:"true",
                data:doc
            });
        }
        else{
            res.json({
                result:"false"
            });
        }
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });
    

    
});


router.post('/save_user_data_in_database',(req,res)=>{
   
    const user=new User({

        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        phone_number:req.body.phone_number,
        date_of_joining:req.body.date_of_joining,
        email:req.body.email

    });
    user.extra_data_in_object_type['bot_registered_id']=req.body.bot_registered_id;
    

    user.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            result:result
        });
    })
    .catch(err=>
        {
            console.log(err)});
});

module.exports=router;