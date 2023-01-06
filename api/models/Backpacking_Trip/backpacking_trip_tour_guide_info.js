const mongoose=require('mongoose');

const backpacking_trip_tour_guide_info=mongoose.Schema({

    phone_number:{type:String},
    email:{type:String},
    backpacking_trip_package_id:{type:mongoose.Schema.Types.ObjectId,ref:'Backpacking_Trip_Package'},
    package_id:{type:String},
    webhook_url:{type:String,default:''},
    user_ns:{type:String,default:''},
    extra_data_in_object_type:{type:mongoose.Schema.Types.Mixed,default:{}},
    bookings_id_array_for_this_particular_package:{type:Array,default:[]}
});



module.exports=mongoose.model('Backpacking_Trip_Tour_Guide_Info',backpacking_trip_tour_guide_info);