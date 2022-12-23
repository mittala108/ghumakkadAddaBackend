const mongoose=require('mongoose');

const backpacking_trip_tour_guide_info=mongoose.Schema({

    phone_number:{type:String},
    email:{type:String},
    package_id:{type:mongoose.Schema.Types.ObjectId,ref:'Backpacking_Trip_Package'},
    webhook_url:{type:String},
    extra_data_in_object_type:{type:mongoose.Schema.Types.Mixed,default:{}},
    extra_data_in_array_type:{type:Array,default:[]}
});



module.exports=mongoose.model('Backpacking_Trip_Tour_Guide_Info',backpacking_trip_tour_guide_info);