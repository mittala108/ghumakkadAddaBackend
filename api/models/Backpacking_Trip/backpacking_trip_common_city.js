const mongoose=require('mongoose');

const backpacking_trip_common_city=mongoose.Schema({

    backpacking_trip_state_id:{type:mongoose.Schema.Types.ObjectId,ref:'Backpacking_Trip_State'},
    common_city:{type:String},
    image_path:{type:String}

});


module.exports=mongoose.model('Backpacking_Trip_Common_City',backpacking_trip_common_city);