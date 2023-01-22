const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Trip_Type=require('../../../models/Trip_Type/trip_type');
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


router.post('/post_trip_type',upload.single('trip_type_image'),(req,res)=>{

    const newData=new Trip_Type({

        _id:mongoose.Types.ObjectId(),
        trip_type:req.body.trip_type,
        trip_type_image_path:req.file.path


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


router.get('/get_trip_types',(req,res)=>{

    Trip_Type.find()
    .exec()
    .then(result=>{
        res.json({
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