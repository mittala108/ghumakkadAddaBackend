const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Backpacking_Trip_Package_Date=require('../../models/Backpacking_Trip/backpacking_trip_package_date');




router.get('/get_backpacking_trip_package_dates',(req,res)=>{

    Backpacking_Trip_Package_Date.find({backpacking_trip_package_id:req.body.backpacking_trip_package_id})
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


router.post('/post_backpacking_trip_package_date',(req,res)=>{

    const newData=new Backpacking_Trip_Package_Date({

        _id:mongoose.Types.ObjectId(),
        backpacking_trip_package_id:req.body.backpacking_trip_package_id,
        date:req.body.date
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