const mongoose=require('mongoose');

const trip_type=mongoose.Schema({

    trip_type:{type:String},
    trip_type_image_path:{type:String},
    is_available:{type:Boolean,default:1}
});


module.exports=mongoose.model('Trip_Type',trip_type);