const mongoose=require('mongoose');


const weekend_trip_common_city=mongoose.Schema({

    common_city:{type:String},
    image_path:{type:String}

});

module.exports=mongoose.model('Weekend_Trip_Common_City',weekend_trip_common_city);