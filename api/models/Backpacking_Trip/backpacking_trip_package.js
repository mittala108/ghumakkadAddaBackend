const mongoose=require('mongoose');

const backpacking_trip_package=mongoose.Schema({

    backpacking_trip_common_city_id:{type:mongoose.Schema.Types.ObjectId,ref:'Backpacking_Trip_Common_City'},
    front_image_path:{type:String},
    package_details_web_url:{type:String},
    package_details_pdf_path:{type:String},
    package_name:{type:String},
    package_description:{type:String},
    package_number_of_days:{type:String},
    package_price_per_person:{type:Number},
    period:{type:String,default:'new'}

});

module.exports=mongoose.model('Backpacking_Trip_Package',backpacking_trip_package);