const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Backpacking_Trip_Package_Date=require('../../models/Backpacking_Trip/backpacking_trip_package_date');
const scheduler=require('node-schedule');



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

    const newDateObject=new Date(req.body.date);
    const date_toDateString=newDateObject.toDateString();
    const getFullYear=newDateObject.getFullYear();
    const getDate=newDateObject.getDate();
    const getMonth=newDateObject.getMonth();

    const newData=new Backpacking_Trip_Package_Date({

        _id:mongoose.Types.ObjectId(),
        backpacking_trip_package_id:req.body.backpacking_trip_package_id,
        date:date_toDateString
    });


    newData.save()
    .then(result=>{

        const date1 = new Date(getFullYear,getMonth,getDate,01, 00, 00).toLocaleString(undefined,{timeZone:'Asia/Kolkata'});

        scheduler.scheduleJob('job1',date1,()=>{

            Backpacking_Trip_Package_Date.deleteOne({date:date1})
            .exec()
            .then(result=>{
                scheduler.cancelJob('job1');
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