const mongoose=require('mongoose');

const tour_guide_info=mongoose.Schema({

    phone_number:{type:String},
    email:{type:String},
    package_ref_id:{type:mongoose.Schema.Types.ObjectId,ref:'Backpacking_Road_Trip_Package'},
    real_package_id:{type:String},
    webhook_url:{type:String,default:''},
    user_ns:{type:String,default:''},
    more_information:{type:String},
    extra_data_in_object_type:{type:mongoose.Schema.Types.Mixed,default:{}},
    bookings_id_array_for_this_particular_package:{type:Array,default:[]}
});



module.exports=mongoose.model('Backpacking_Road_Trip_Tour_Guide_Info',tour_guide_info);