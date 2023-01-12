const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Backpacking_Trip_Group_Or_Solo_Travel=require('../../models/Backpacking_Trip/backpacking_trip_group_or_solo_travel');




router.get('/get_backpacking_trip_group_or_solo_travelling',(req,res)=>{

    Backpacking_Trip_Group_Or_Solo_Travel.find()
    .populate({
       
            path:'backpacking_trip_package_id',
            populate:{
                path:'backpacking_trip_travel_mode_id',
                model:'Backpacking_Trip_Travel_Mode',
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

router.get('get_backpacking_trip_group_or_solo_travelling/:backpacking_trip_package_id',(req,res)=>{

    Backpacking_Trip_Group_Or_Solo_Travel.find({backpacking_trip_package_id:req.params.backpacking_trip_package_id})
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


router.post('/post_backpacking_trip_group_or_solo_travel',(req,res)=>{

    const newData=new Backpacking_Trip_Group_Or_Solo_Travel({

        backpacking_trip_package_id:req.body.backpacking_trip_package_id,
        travel_grouping:req.body.travel_grouping
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

router.delete('/delete_backpacking_trip_group_or_solo_travel/:backpacking_trip_group_or_solo_travel_id',(req,res)=>{

    Backpacking_Trip_Group_Or_Solo_Travel.findOne({_id:req.params.backpacking_trip_group_or_solo_travel_id})
    .exec()
    .then(result=>{
        res.json({
            message:'backpacking_trip_group_or_solo_travel data deleted'
        });
    })
    .catch(err=>{
        res.json({
            error:err
        });
    });
});


module.exports=router;