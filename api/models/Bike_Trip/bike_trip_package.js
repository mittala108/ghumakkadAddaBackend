const mongoose=require('mongoose');

const bike_trip_package=mongoose.Schema({

    bike_trip_common_city_id:{type:mongoose.Schema.Types.ObjectId,ref:'Bike_Trip_Common_City'},
    front_image_path:{type:String},
    package_details_web_url:{type:String},
    package_details_pdf_path:{type:String},
    package_name:{type:String},
    package_description:{type:String},
    package_number_of_days:{type:String},
    package_price_per_person_without_rental_bike_and_accessories:{type:Number},
    package_price_per_person_with_rental_bike_and_accessories:{type:Number},
    period:{type:String,default:'new'}

});

module.exports=mongoose.model('Bike_Trip_Package',bike_trip_package);
