const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Backpacking_Trip_Common_City=require('../../models/Backpacking_Trip/backpacking_trip_common_city');
const multer=require('multer');

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/');
    },

    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
});

const upload=multer({storage:storage});




router.get('/get_backpacking_trip_common_cities',(req,res)=>{

    Backpacking_Trip_Common_City.find({backpacking_trip_state_id:req.body.backpacking_trip_state_id})
    .populate('backpacking_trip_state_id')
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



router.post('/post_backpacking_trip_common_city',upload.single('city_image'),(req,res)=>{

    const newData=new Backpacking_Trip_Common_City({

        _id:mongoose.Types.ObjectId(),
        backpacking_trip_state_id:req.body.backpacking_trip_state_id,
        common_city:req.body.common_city,
        image_path:req.file.path
    });

    newData.save()
    .then(result=>{
        res.json({
            message:'data saved successfully',
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