const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Backpacking_Trip_Package_Cost=require('../../models/Backpacking_Trip/backpacking_trip_package_cost');


router.post('/post_backpacking_trip_package_cost',(req,res)=>{

    const newData=new Backpacking_Trip_Package_Cost({
        
        _id:mongoose.Types.ObjectId(),
        backpacking_trip_package_date_id:req.body.backpacking_trip_package_date_id,
        date_of_journey:req.body.date_of_journey,
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
})


router.get('/get_backpacking_trip_packages_cost/:backpacking_trip_package_date_id',(req,res)=>{
    Backpacking_Trip_Package_Cost.find({backpacking_trip_package_date_id:req.params.backpacking_trip_package_date_id})
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


router.get('/get_backpacking_trip_packages_cost',(req,res)=>{

    Backpacking_Trip_Package_Cost.find()
    .populate({
            path:'backpacking_trip_package_date_id',
            populate:{
                path:'backpacking_trip_package_id',
                model:'Backpacking_Trip_Package',
                populate:{
                    path:'backpacking_trip_common_city_id',
                    model:'Backpacking_Trip_Common_City',
                    populate:{
                        path:'backpacking_trip_state_id',
                        model:'Backpacking_Trip_State'
                    }
            }         
        }
    })
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