const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Booking_Id_For_A_Particular_Package=require('../../../models/Tour_Guide/booking_id_for_a_particular_package');


router.post('/post_booking_id_for_a_particular_package',(req,res)=>{

    const newData=new Booking_Id_For_A_Particular_Package({

        _id:mongoose.Types.ObjectId(),
        booking_id:req.body.booking_id,
        booking_model:req.body.booking_model,
        package_offered_by_tour_guide_id:req.body.package_offered_by_tour_guide_id
    });

    newData.save()
    .then(result=>{
        res.json({
            message:'data saved successfully',
            data:result
        });
    })
    .catch(err=>{
        res.json({
            error:err
        });
    });
});


router.get('/get_booking_ids_for_a_particular_package/:package_offered_by_tour_guide_id',(req,res)=>{

    Booking_Id_For_A_Particular_Package.find({package_offered_by_tour_guide_id:req.params.package_offered_by_tour_guide_id})
    .populate('booking_id package_offered_by_tour_guide_id')
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