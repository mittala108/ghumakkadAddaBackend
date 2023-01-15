const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Backpacking_Road_Trip_Package=require('../../../models/Backpacking_Trip/by_road_travel_mode_models/road_trip_package');
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


router.get('/get_backpacking_road_trip_packages/:backpacking_trip_travel_mode_id',(req,res)=>{

    Backpacking_Road_Trip_Package.find({backpacking_trip_travel_mode_id:req.params.backpacking_trip_travel_mode_id,is_available:1})
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
router.get('/get_backpacking_road_trip_packages',(req,res)=>{
    Backpacking_Road_Trip_Package.find()
    .populate({
        path:'backpacking_trip_travel_mode_id',
        populate:{
            path:'backpacking_trip_common_city_id',
            model:'Backpacking_Trip_Common_City',
            populate:{
                path:'backpacking_trip_state_id',
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
router.post('/post_backpacking_road_trip_package',upload.fields([{name:'package_front_image',maxCount:1},{name:'package_details_pdf',maxCount:1}]),(req,res)=>{


    const actual_package_id='BATP'+String(randomstring.generate({
        length:12,
        charset:'numeric'
    }));
    

    const newData=new Backpacking_Road_Trip_Package({

        _id:mongoose.Types.ObjectId(),
        package_id:actual_package_id,
        backpacking_trip_travel_mode_id:req.body.backpacking_trip_travel_mode_id,
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
router.post('/update_backpacking_road_trip_package',upload.fields([{name:'package_front_image',maxCount:1},{name:'package_details_pdf',maxCount:1}]),(req,res)=>{

    Backpacking_Road_Trip_Package.findOne({_id:req.body.backpacking_road_trip_package_id})
    .exec()
    .then(result=>{

        if(req.files==undefined)
        {
            Backpacking_Road_Trip_Package.updateOne({_id:req.body.backpacking_road_trip_package_id},{
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

            Backpacking_Road_Trip_Package.updateOne({_id:req.body.backpacking_road_trip_package_id},{
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

            Backpacking_Road_Trip_Package.updateOne({_id:req.body.backpacking_road_trip_package_id},{
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

            Backpacking_Road_Trip_Package.updateOne({_id:req.body.backpacking_road_trip_package_id},{
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


router.delete('/delete_backpacking_road_trip_package_image_and_pdf_file/:backpacking_road_trip_package_id',(req,res)=>{

    Backpacking_Road_Trip_Package.findOne({_id:req.params.backpacking_road_trip_package_id})
    .exec()
    .then(result=>{

        const imagePath=String(path.dirname(require.main.filename))+'\\'+String(result.package_front_image_path);
        const pdfPath=String(path.dirname(require.main.filename))+'\\'+String(result.package_details_pdf_path);

        fs.unlinkSync(imagePath);
        fs.unlinkSync(pdfPath);

        console.log('old image and pdf deleted');
        Backpacking_Road_Trip_Package.updateOne({_id:req.params.backpacking_road_trip_package_id},{package_front_image_path:'',package_details_pdf_path:''})
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