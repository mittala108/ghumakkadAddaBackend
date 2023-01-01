const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Bike_Trip_Package_Cost=require('../../models/Bike_Trip/bike_trip_package_cost');


router.post('/post_bike_trip_package_cost',(req,res)=>{

    const newData=new Bike_Trip_Package_Cost({
        
        _id:mongoose.Types.ObjectId(),
        bike_trip_package_date_id:req.body.bike_trip_package_date_id,
        package_cost:req.body.package_cost

    });

    newData.save()
    .then(result=>{
        res.json({
            message:'Data saved successfully',
            data:result

        });
    })
    .catch(err=>{
        res.json({
            error:err
        });
    });
});


router.get('/get_bike_trip_packages_cost/:bike_trip_package_date_id',(req,res)=>{
    Bike_Trip_Package_Cost.find({bike_trip_package_date_id:req.params.bike_trip_package_date_id})
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


router.get('/get_bike_trip_packages_cost',(req,res)=>{

    Bike_Trip_Package_Cost.find()
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