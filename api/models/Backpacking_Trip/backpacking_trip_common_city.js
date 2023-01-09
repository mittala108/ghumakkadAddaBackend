const mongoose=require('mongoose');

const backpacking_trip_common_city=mongoose.Schema({
    
    common_city:{type:String},
    is_available:{type:Boolean,default:1},
    backpacking_trip_state_id:{type:mongoose.Schema.Types.ObjectId,ref:'Backpacking_Trip_State'},
    common_city_image_path:{type:String}

});


module.exports=mongoose.model('Backpacking_Trip_Common_City',backpacking_trip_common_city);