const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Package_Cost=require('../../../../models/Backpacking_Trip/ByRoad/package_cost');


router.post('/post_package_cost_fields',(req,res)=>{

    const newData=new Package_Cost({
        
        _id:mongoose.Types.ObjectId(),
        package_date_id:req.body.package_date_id,
        group_or_solo_travel_id:req.body.group_or_solo_travel_id,
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


router.get('/get_packages_cost_fields/:package_date_id/:group_or_solo_travel_id',(req,res)=>{
    Package_Cost.find({
        package_date_id:req.params.package_date_id,
        group_or_solo_travel_id:req.params.group_or_solo_travel_id
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


router.get('/get_packages_cost_fields',(req,res)=>{

    Package_Cost.find()
    .populate({
        path:'package_date_id',
        populate:{
            path:'package_ref_id',
            model:'Backpacking_Road_Trip_Package',
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
        }
    })
    .populate({
        path:'group_or_solo_travel_id',
        populate:{
            path:'package_ref_id',
            model:'Backpacking_Road_Trip_Package',
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