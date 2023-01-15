const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Package=require('../../../models/Backpacking_Trip/ByRoad/package');
const multer=require('multer');
const fs = require("fs");
var randomstring = require("randomstring");

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/');
    },

    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
});

const upload=multer({storage:storage});


router.get('/get_packages_fields/:travel_mode_id',(req,res)=>{

    Package.find({travel_mode_id:req.params.travel_mode_id,is_available:1})
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
router.get('/get_packages_fields',(req,res)=>{
    Package.find()
    .populate({
        path:'travel_mode_id',
        populate:{
            path:'common_city_id',
            model:'Backpacking_Trip_Common_City',
            populate:{
                path:'state_id',
                model:'Backpacking_Trip_State'
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
    .catch(error=>{
        res.json({
            error:err
        });
    });
});

//route for retool admin panel
router.post('/post_package_fields',upload.fields([{name:'package_front_image',maxCount:1},{name:'package_details_pdf',maxCount:1}]),(req,res)=>{


    const actual_package_id='BATP'+String(randomstring.generate({
        length:12,
        charset:'numeric'
    }));
    

    const newData=new Package({

        _id:mongoose.Types.ObjectId(),
        package_id:actual_package_id,
        travel_mode_id:req.body.travel_mode_id,
        package_front_image_path:req.files.package_front_image[0].path,
        package_details_web_url:req.body.package_details_web_url,
        package_details_pdf_path:req.files.package_details_pdf[0].path,
        package_name:req.body.package_name,
        package_description:req.body.package_description,
        package_number_of_days:req.body.package_number_of_days,
        package_offered_by:req.body.package_offered_by
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
router.patch('/update_package_fields',upload.fields([{name:'package_front_image',maxCount:1},{name:'package_details_pdf',maxCount:1}]),(req,res)=>{

    Package.findOne({_id:req.body.package_id})
    .exec()
    .then(result=>{

        if(req.files==undefined)
        {
            Package.updateOne({_id:req.body.package_id},{
                package_details_web_url:req.body.package_details_web_url,
                package_name:req.body.package_name,
                package_description:req.body.package_description,
                package_number_of_days:req.body.package_number_of_days,
                is_available:req.body.is_available,
                package_offered_by:req.body.package_offered_by
            })
            .exec()
            .then(result1=>{
                res.json({
                    message:'data updated',
                    data:result1
    
                });
            });

        }

        else if(req.files.package_front_image[0]==undefined && req.files.package_details_pdf[0]!=undefined)
        {
            const pdfPath=String(path.dirname(require.main.filename))+'/'+String(result.package_details_pdf_path);

            fs.unlinkSync(pdfPath);

            console.log('old pdf deleted');

            Package.updateOne({_id:req.body.package_id},{
                package_details_pdf_path:req.files.package_details_pdf[0].path,
                package_details_web_url:req.body.package_details_web_url,
                package_name:req.body.package_name,
                package_description:req.body.package_description,
                package_number_of_days:req.body.package_number_of_days,
                is_available:req.body.is_available,
                package_offered_by:req.body.package_offered_by
            })
            .exec()
            .then(result1=>{
                res.json({
                    message:'data updated',
                    data:result1

                });
            });

        }

        else if(req.files.package_front_image[0]!=undefined && req.files.package_details_pdf[0]==undefined)
        {
            const imagePath=String(path.dirname(require.main.filename))+'/'+String(result.package_front_image_path);

            fs.unlinkSync(imagePath);

            console.log('old image deleted');

            Package.updateOne({_id:req.body.package_id},{
                package_front_image_path:req.files.package_front_image[0].path,
                package_details_web_url:req.body.package_details_web_url,
                package_name:req.body.package_name,
                package_description:req.body.package_description,
                package_number_of_days:req.body.package_number_of_days,
                is_available:req.body.is_available,
                package_offered_by:req.body.package_offered_by
            })
            .exec()
            .then(result1=>{
                res.json({
                    message:'data updated',
                    data:result1

                });
            });

        }
        else if(req.files.package_front_image[0]!=undefined && req.files.package_details_pdf[0]!=undefined)
        {
            const imagePath=String(path.dirname(require.main.filename))+'/'+String(result.package_front_image_path);
            const pdfPath=String(path.dirname(require.main.filename))+'/'+String(result.package_details_pdf_path);

            fs.unlinkSync(imagePath);
            fs.unlinkSync(pdfPath);

            console.log('old image and pdf deleted');

            Package.updateOne({_id:req.body.package_id},{
                package_front_image_path:req.files.package_front_image[0].path,
                package_details_pdf_path:req.files.package_details_pdf[0].path,
                package_details_web_url:req.body.package_details_web_url,
                package_name:req.body.package_name,
                package_description:req.body.package_description,
                package_number_of_days:req.body.package_number_of_days,
                is_available:req.body.is_available,
                package_offered_by:req.body.package_offered_by
            })
            .exec()
            .then(result1=>{
                res.json({
                    message:'data updated',
                    data:result1

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


router.delete('/delete_package_image_and_pdf_file/:package_id',(req,res)=>{

    Package.findOne({_id:req.params.package_id})
    .exec()
    .then(result=>{

        const imagePath=String(path.dirname(require.main.filename))+'\\'+String(result.package_front_image_path);
        const pdfPath=String(path.dirname(require.main.filename))+'\\'+String(result.package_details_pdf_path);

        fs.unlinkSync(imagePath);
        fs.unlinkSync(pdfPath);

        console.log('old image and pdf deleted');
        Package.updateOne({_id:req.params.package_id},{package_front_image_path:'',package_details_pdf_path:''})
        .exec()
        .then(result=>{
            console.log('package front image and pdf path data deleted from database');
        });
        
    })
    .catch(err=>{
        res.json({
            error:err
        });
    });

});

module.exports=router;