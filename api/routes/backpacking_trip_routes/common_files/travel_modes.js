const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Travel_Mode=require('../../../models/Backpacking_Trip/travel_mode');

//route for uchat
router.get('/get_travel_modes_fields/:common_city_id',(req,res)=>{

    Travel_Mode.find({common_city_id:req.params.common_city_id,is_available:1})
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

router.get('/get_travel_modes_fields_for_admin_panel/:common_city_id',(req,res)=>{

    Travel_Mode.find({common_city_id:req.params.common_city_id})
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

//route for admin panel
router.get('/get_travel_modes_fields',(req,res)=>{

    Travel_Mode.find()
    .populate({
        path:'common_city_id',
        populate:{
            path:'state_id'
        }
    })
    .exec()
    .then(result=>{
        res.json({
            data:result
        });
    })
    .catch(err=>{
        res.json({
            error:err
        });
    });
});


router.post('/post_travel_mode_fields',(req,res)=>{

    console.log(req.body);

    const newData=new Travel_Mode({
        
        _id:mongoose.Types.ObjectId(),
        common_city_id:req.body.common_city_id,
        travel_mode:req.body.travel_mode
    });

    newData.save()
    .then(result=>{
        res.json({
            data:result,
            message:'data saved successfully'
        });
    })
    .catch(err=>{
        res.json({
            error:err
        });
    });
});

router.patch('/update_travel_mode_fields',(req,res)=>{

    Travel_Mode.updateOne({_id:req.body.travel_mode_id},{
        travel_mode:req.body.travel_mode,
        is_available:req.body.is_available
    })
    .exec()
    .then(result=>{
        res.json({
            data:result,
            message:'data updated'
        });
    })
    .catch(err=>{
        res.json({
            error:err
        });
    });
});


module.exports=router;