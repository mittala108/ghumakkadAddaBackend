const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Weekend_Trip_Common_City=require('../../models/Weekend_Trip/weekend_trip_common_city');
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


router.get('/get_weekend_trip_common_cities',(req,res)=>{

    Weekend_Trip_Common_City.find()
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


router.post('/post_weekend_trip_common_city',upload.single('city_image'),(req,res)=>{

    const newData=new Weekend_Trip_Common_City({

        _id:mongoose.Types.ObjectId(),
        common_city:req.body.common_city,
        image_path:req.file.path
    });

    newData.save()
    .then(result=>{
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
