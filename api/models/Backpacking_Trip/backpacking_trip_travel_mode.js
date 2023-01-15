const mongoose=require('mongoose');


const backpacking_trip_travel_mode=mongoose.Schema({

    backpacking_trip_common_city_id:{type:mongoose.Schema.Types.ObjectId,ref:'Backpacking_Trip_Common_City'},
    travel_mode:{type:String},
    is_available:{type:Boolean,default:0}

});


module.exports=mongoose.model('Backpacking_Trip_Travel_Mode',backpacking_trip_travel_mode);