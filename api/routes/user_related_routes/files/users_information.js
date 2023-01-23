const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const User=require('../../../models/User/user_information');


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

router.patch('/update_user_data',(req,res)=>{

    User.updateOne({_id:req.body.user_id},{

        name:req.body.name,
        phone_number:req.body.phone_number,
        email:req.body.email

    })
    .exec()
    .then(result=>{
        res.json({
            message:'user information updated',
            data:result
        });
    })
    .catch(err=>{
        res.json({
            error:err
        });
    });
});

router.get('/get_all_users_information',(req,res)=>{

    User.find()
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

module.exports=router;