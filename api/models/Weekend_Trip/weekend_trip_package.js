const mongoose=require('mongoose');

const weekend_trip_package=mongoose.Schema({

    weekend_trip_common_city_id:{type:mongoose.Schema.Types.ObjectId,ref:'Weekend_Trip_Common_City'},
    front_image_path:{type:String},
    package_details_web_url:{type:String},
    package_details_pdf_path:{type:String},
    package_name:{type:String},
    package_description:{type:String},
    package_number_of_days:{type:String},
    package_price_per_person:{type:Number},
    period:{type:String,default:'new'}

});

module.exports=mongoose.model('Weekend_Trip_Package',weekend_trip_package);
