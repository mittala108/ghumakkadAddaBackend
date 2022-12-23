const mongoose=require('mongoose');


const bike_trip_common_city=mongoose.Schema({

    common_city:{type:String},
    image_path:{type:String}

});

module.exports=mongoose.model('Bike_Trip_Common_City',bike_trip_common_city);