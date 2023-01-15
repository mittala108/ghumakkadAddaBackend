const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const State=require('../../models/Backpacking_Trip/state');
const multer=require('multer');
const fs=require('fs');
const path = require('path');


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
router.get('/get_states_fields',(req,res)=>{

    State.find({is_available:1})
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

//route for admin panel
router.get('/get_states_fields_for_admin_panel',(req,res)=>{

    State.find()
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



router.post('/post_state_fields',upload.single('state_image'),(req,res)=>{

    const newData=new State({

        _id:mongoose.Types.ObjectId(),
        state:req.body.state,
        state_image_path:req.file.path,
        is_available:req.body.is_available
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


//update
router.patch('/update_state_fields',upload.single('state_image'),(req,res)=>{



    State.findOne({_id:req.body.state_id})
    .exec()
    .then(result=>{
       
        if(req.file==undefined)
        {
            State.updateOne({_id:req.body.state_id},{
                is_available:req.body.is_available
            })
            .exec()
            .then(result1=>{
                res.json({
                    message:'Data updated'
                });
            });

        }
        else
        {
            const filePath=String(path.dirname(require.main.filename))+'/'+String(result.state_image_path);
            console.log(filePath);
            fs.unlinkSync(`${filePath}`);
            console.log('old state image deleted');
            State.updateOne({_id:req.body.state_id},{
                state_image_path:req.file.path,
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

router.delete('/delete_state_image_field/:state_id',(req,res)=>{

    console.log('here');

    State.findOne({_id:req.params.state_id})
    .exec()
    .then(result=>{
        console.log(result);
        const filePath=String(path.dirname(require.main.filename))+'/'+String(result.state_image_path);
        console.log(filePath);
        fs.unlinkSync(filePath);
        console.log('state image deleted');
        State.updateOne({_id:req.params.state_id},{state_image_path:''})
        .exec()
        .then(result1=>{
            console.log('state_image_path data deleted from database');
            res.json({
                message:'image is deleted'
            });
        });
    })
    .catch(err=>{
        res.json({
            error:err
        });
    });
});




module.exports=router;