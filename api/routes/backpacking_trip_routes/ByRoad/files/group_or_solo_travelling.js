const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Group_Or_Solo_Trip=require('../../../../models/Backpacking_Trip/ByRoad/group_or_solo_travel');




router.get('/get_group_or_solo_travelling_fields',(req,res)=>{

    Group_Or_Solo_Trip.find()
    .populate('package_ref_id')
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

router.patch('/update_group_or_solo_travel_field',(req,res)=>{

    Group_Or_Solo_Trip.updateOne({_id:req.body.group_or_solo_travel_id},{travel_grouping:req.body.travel_grouping})
    .exec()
    .then(result=>{
        res.json({
            message:'group or solo traval fields updated',
            data:result
        });
    })
    .catch(err=>{
        res.json({
            error:err
        });
    });
});

module.exports=router;