const mongoose=require('mongoose');


const travel_mode=mongoose.Schema({

    common_city_id:{type:mongoose.Schema.Types.ObjectId,ref:'Backpacking_Trip_Common_City'},
    travel_mode:{type:String},
    is_available:{type:Boolean,default:0}

});


module.exports=mongoose.model('Backpacking_Trip_Travel_Mode',travel_mode);