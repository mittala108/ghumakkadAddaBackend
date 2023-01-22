const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Common_City=require('../../../models/Backpacking_Trip/common_city');
const multer=require('multer');
const fs = require("fs");

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/');
    },

    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
});

const upload=multer({storage:storage});



//route for uchat
router.get('/get_common_cities_fields/:state_id',(req,res)=>{

    Common_City.find({state_id:req.params.state_id,is_available:1})
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


//route for retool admin panel
router.get('/get_common_cities_fields',(req,res)=>{

    Common_City.find()
    .populate('state_id')
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


//route for retool admin panel
router.post('/post_common_city_fields',upload.single('common_city_image'),(req,res)=>{

    const newData=new Common_City({

        _id:mongoose.Types.ObjectId(),
        state_id:req.body.state_id,
        common_city:req.body.common_city,
        common_city_image_path:req.file.path
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

//update
router.patch('/update_common_city_fields',upload.single('common_city_image'),(req,res)=>{

    Common_City.findOne({_id:req.body.common_city_id})
    .exec()
    .then(result=>{
        if(req.file==undefined)
        {
            Common_City.updateOne({_id:req.body.common_city_id},{
                is_available:req.body.is_available
            })
            .exec()
            .then(result1=>{
                res.json({
                    message:'Data updated'
                });
            });

        }

        else{
            const filePath=String(path.dirname(require.main.filename))+'/'+String(result.common_city_image_path);
            console.log(filePath);
            fs.unlinkSync(`${filePath}`);
            console.log('old state image deleted');
            Common_City.updateOne({_id:req.body.common_city_id},{
                common_city_image_path:req.file.path,
                is_available:req.body.is_available
            })
            .exec()
            .then(result1=>{
                res.json({
                    message:'Data updated'
                });
            });
        }
        
    })
    .catch(err=>{
        res.json({
            error:err
        });
    });
});

router.delete('/delete_common_city_image_field/:common_city_id',(req,res)=>{
    Common_City.findOne({_id:req.params.common_city_id})
    .exec()
    .then(result=>{

        const filePath=String(path.dirname(require.main.filename))+'/'+String(result.common_city_image_path);
        fs.unlinkSync(filePath);
        console.log('common_city_image_deleted');
        Common_City.updateOne({_id:req.params.common_city_id},{common_city_image_path:''})
        .exec()
        .then(result=>{
            console.log('common city image path data is deleted from database');
        });
    })
    .catch(err=>{
        res.json({
            error:err
        });
    });

});

module.exports=router;