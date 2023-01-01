const mongoose=require('mongoose');

const backpacking_trip_package=mongoose.Schema({
    
    package_id:{type:String},
    backpacking_trip_common_city_id:{type:mongoose.Schema.Types.ObjectId,ref:'Backpacking_Trip_Common_City'},
    package_front_image_path:{type:String},
    package_details_web_url:{type:String},
    package_details_pdf_path:{type:String},
    package_name:{type:String},
    package_description:{type:String},
    package_number_of_days:{type:String},
    period:{type:String,default:'new'}

});

module.exports=mongoose.model('Backpacking_Trip_Package',backpacking_trip_package);