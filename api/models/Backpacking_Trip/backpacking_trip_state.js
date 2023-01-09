const mongoose=require('mongoose');

const backpacking_trip_state=mongoose.Schema({

    state:{type:String},
    is_available:{type:Boolean,default:0},
    state_image_path:{type:String}

});


module.exports=mongoose.model('Backpacking_Trip_State',backpacking_trip_state)