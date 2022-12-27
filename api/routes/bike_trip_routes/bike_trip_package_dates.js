const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Bike_Trip_Package_Date=require('../../models/Bike_Trip/bike_trip_package_date');
const scheduler=require('node-schedule');


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

    const newDateObject=new Date(req.body.date);
    const date_toDateString=newDateObject.toDateString();
    const getFullYear=newDateObject.getFullYear();
    const getDate=newDateObject.getDate();
    const getMonth=newDateObject.getMonth();

    const newData=new Bike_Trip_Package_Date({

        _id:mongoose.Types.ObjectId(),
        bike_trip_package_id:req.body.bike_trip_package_id,
        date:date_toDateString
    });


    newData.save()
    .then(result=>{

        const date1 = new Date(getFullYear,getMonth,getDate,01, 00, 00).toLocaleString(undefined,{timeZone:'Asia/Kolkata'});

        scheduler.scheduleJob('job2',date1,()=>{

            Bike_Trip_Package_Date.deleteOne({date:date1})
            .exec()
            .then(result=>{
                scheduler.cancelJob('job2');
                console.log('date deleted successfully');
            });
        });

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