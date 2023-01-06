const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Backpacking_Trip_Travel_Mode=require('../../models/Backpacking_Trip/backpacking_trip_travel_mode');


router.get('/get_backpacking_trip_travel_modes/:backpacking_trip_common_city_id',(req,res)=>{

    Backpacking_Trip_Travel_Mode.find({backpacking_trip_common_city_id:req.params.backpacking_trip_common_city_id})
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


router.get('/get_backpacking_trip_travel_modes',(req,res)=>{

    Backpacking_Trip_Travel_Mode.find()
    .populate({
        path:'backpacking_trip_common_city_id',
        populate:{
            path:'backpacking_trip_state_id',
            model:'Backpacking_Trip_State'
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


router.post('/post_backpacking_trip_travel_mode',(req,res)=>{

    console.log(req.body);

    const newData=new Backpacking_Trip_Travel_Mode({
        
        _id:mongoose.Types.ObjectId(),
        backpacking_trip_common_city_id:req.body.backpacking_trip_common_city_id,
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





module.exports=router;