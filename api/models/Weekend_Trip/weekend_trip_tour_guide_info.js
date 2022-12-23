const mongoose=require('mongoose');

const weekend_trip_tour_guide_info=mongoose.Schema({

    phone_number:{type:String},
    email:{type:String},
    package_id:{type:mongoose.Schema.Types.ObjectId,ref:'Weekend_Trip_Package'},
    webhook_url:{type:String},
    extra_data_in_object_type:{type:mongoose.Schema.Types.Mixed,default:{}},
    extra_data_in_array_type:{type:Array,default:[]}
});



module.exports=mongoose.model('Weekend_Trip_Tour_Guide_Info',weekend_trip_tour_guide_info);