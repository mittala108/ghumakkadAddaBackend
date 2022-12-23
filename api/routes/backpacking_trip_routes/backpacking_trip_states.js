const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Backpacking_Trip_State=require('../../models/Backpacking_Trip/backpacking_trip_state');




router.get('/get_backpacking_trip_states',(req,res)=>{

    Backpacking_Trip_State.find()
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



router.post('/post_backpacking_trip_state',(req,res)=>{

    const newData=new Backpacking_Trip_State({

        _id:mongoose.Types.ObjectId(),
        state:req.body.state
    });

    newData.save()
    .then(result=>{
        res.json({
            message:'Data saved successfully'
        });
    })
    .catch(err=>{
        res.json({
            error:err
        });
    });
});


module.exports=router;