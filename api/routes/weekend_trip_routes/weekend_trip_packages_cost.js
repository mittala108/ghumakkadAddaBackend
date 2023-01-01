const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Weekend_Trip_Package_Cost=require('../../models/Weekend_Trip/weekend_trip_package_date');


router.post('/post_weekend_trip_package_cost',(req,res)=>{

    const newData=new Weekend_Trip_Package_Cost({
        
        _id:mongoose.Types.ObjectId(),
        weekend_trip_package_date_id:req.body.weekend_trip_package_date_id,
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


router.get('/get_weekend_trip_packages_cost/:weekend_trip_package_date_id',(req,res)=>{
    Weekend_Trip_Package_Cost.find({weekend_trip_package_date_id:req.params.weekend_trip_package_date_id})
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


router.get('/get_weekend_trip_packages_cost',(req,res)=>{

    Weekend_Trip_Package_Cost.find()
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