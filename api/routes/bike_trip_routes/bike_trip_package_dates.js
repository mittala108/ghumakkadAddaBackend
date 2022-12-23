const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Bike_Trip_Package_Date=require('../../models/Bike_Trip/bike_trip_package_date');


router.get('/get_bike_trip_package_dates',(req,res)=>{

    Bike_Trip_Package_Date.find({bike_trip_package_id:req.body.bike_trip_package_id})
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



router.post('/post_bike_trip_paackage_date',(req,res)=>{

    const newData=new Bike_Trip_Package_Date({

        _id:mongoose.Types.ObjectId(),
        bike_trip_package_id:req.body.bike_trip_package_id,
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