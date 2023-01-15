const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Backpacking_Road_Trip_Group_Or_Solo_Trip=require('../../../models/Backpacking_Trip/by_road_travel_mode_models/road_trip_group_or_solo_travel');




router.get('/get_backpacking_road_trip_group_or_solo_travelling',(req,res)=>{

    Backpacking_Road_Trip_Group_Or_Solo_Trip.find()
    .populate({
       
            path:'backpacking_road_trip_package_id',
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

router.get('/get_backpacking_road_trip_group_or_solo_travelling/:backpacking_road_trip_package_id',(req,res)=>{

    Backpacking_Road_Trip_Group_Or_Solo_Trip.find({backpacking_road_trip_package_id:req.params.backpacking_road_trip_package_id})
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


router.post('/post_backpacking_road_trip_group_or_solo_travel',(req,res)=>{

    const newData=new Backpacking_Road_Trip_Group_Or_Solo_Trip({

        backpacking_road_trip_package_id:req.body.backpacking_road_trip_package_id,
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

router.delete('/delete_backpacking_road_trip_group_or_solo_travel/:backpacking_road_trip_group_or_solo_travel_id',(req,res)=>{

    Backpacking_Road_Trip_Group_Or_Solo_Trip.findOne({_id:req.params.backpacking_road_trip_group_or_solo_travel_id})
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