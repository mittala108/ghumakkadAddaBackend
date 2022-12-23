const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Bike_Trip_Package=require('../../models/Bike_Trip/bike_trip_package');
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



router.get('/get_bike_trip_packages',(req,res)=>{

    Bike_Trip_Package.find({bike_trip_common_city_id:req.body.bike_trip_common_city_id,period:'new'})
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


router.post('/post_bike_trip_package',upload.fields([{name:'front_image_path',maxCount:1},{name:'package_details_url_path',maxCount:1}]),(req,res)=>{

    const newData=new Bike_Trip_Package({

        _id:mongoose.Types.ObjectId(),
        bike_trip_common_city_id:req.body.bike_trip_common_city_id,
        front_image_path:req.files.front_image_path,
        package_details_web_url:req.body.package_details_web_url,
        package_details_pdf_path:req.files.package_details_pdf_path,
        package_name:req.body.package_name,
        package_description:req.body.package_description,
        package_number_of_days:req.body.package_number_of_days,
        package_price_per_person_without_rental_bike_and_accessories:req.body.package_price_per_person_without_rental_bike_and_accessories,
        package_price_per_person_with_rental_bike_and_accessories:req.body.package_price_per_person_with_rental_bike_and_accessories
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