const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Package_Offered_By_Tour_Guide=require('../../../models/Tour_Guide/package_offered_by_tour_guide');

router.post('/post_package_offered_by_tour_guide',(req,res)=>{

    const newData=new Package_Offered_By_Tour_Guide({

        _id:mongoose.Types.ObjectId(),
        package_ref_id:req.body.package_ref_id,
        package_model:req.body.package_model,
        tour_guide_information_id:req.body.tour_guide_information_id
    });

    newData.save()
    .then(result=>{
        res.json({
            message:"data entered successfully"
        });
    })
    .catch(err=>{
        res.json({
            error:err
        });
    });
});


router.get('/get_packages_offered_by_tour_guide/:tour_guide_information_id',(req,res)=>{

    Package_Offered_By_Tour_Guide.find({tour_guide_information_id:req.params.tour_guide_information_id})
    .populate('package_ref_id tour_guide_information_id')
    .exec()
    .then(result=>{
        res.json({
            result:result
        });
    })
    .catch(err=>{
        res.json({
            error:err
        });
    });

});








module.exports=router;