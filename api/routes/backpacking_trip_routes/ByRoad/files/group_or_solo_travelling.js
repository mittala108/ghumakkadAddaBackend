const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Group_Or_Solo_Trip=require('../../../../models/Backpacking_Trip/ByRoad/group_or_solo_travel');




router.get('/get_group_or_solo_travelling_fields',(req,res)=>{

    Group_Or_Solo_Trip.find()
    .populate({
       
            path:'package_ref_id',
            populate:{
                path:'travel_mode_id',
                model:'Backpacking_Trip_Travel_Mode',
                populate:{
                    path:'common_city_id',
                    model:'Backpacking_Trip_Common_City',
                    populate:{
                        path:'state_id',
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

router.get('/get_group_or_solo_travelling_fields/:package_ref_id',(req,res)=>{

    Group_Or_Solo_Trip.find({package_ref_id:req.params.package_ref_id})
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


router.post('/post_group_or_solo_travel_fields',(req,res)=>{

    const newData=new Group_Or_Solo_Trip({

        package_ref_id:req.body.package_ref_id,
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

router.delete('/delete_group_or_solo_travel_fields/:group_or_solo_travel_id',(req,res)=>{

    Group_Or_Solo_Trip.findOne({_id:req.params.group_or_solo_travel_id})
    .exec()
    .then(result=>{
        res.json({
            message:'group_or_solo_travel data deleted'
        });
    })
    .catch(err=>{
        res.json({
            error:err
        });
    });
});


module.exports=router;