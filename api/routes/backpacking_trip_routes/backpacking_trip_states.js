const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Backpacking_Trip_State=require('../../models/Backpacking_Trip/backpacking_trip_state');
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

router.get('/get_backpacking_trip_states',(req,res)=>{

    Backpacking_Trip_State.find()
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



router.post('/post_backpacking_trip_state',upload.single('state_image'),(req,res)=>{

    const newData=new Backpacking_Trip_State({

        _id:mongoose.Types.ObjectId(),
        state:req.body.state,
        state_image_path:req.file.path
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
});


module.exports=router;