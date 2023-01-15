const mongoose=require('mongoose');

const booking_detail=mongoose.Schema({

    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    booking_id:{type:String},
    communication_channel:{type:String},
    package_ref_id:{type:mongoose.Schema.Types.ObjectId,ref:'Backpacking_Road_Trip_Package'},
    date_of_journey:{type:Date},
    group_or_solo_travel:{type:String},
    no_of_bookings:{type:Number},
    total_amount_paid:{type:Number},
    cost_of_package:{type:Number},
    payment_details_id:{type:mongoose.Schema.Types.ObjectId,ref:'Backpacking_Road_Trip_Payment_Detail'},
    refund_demand:{type:String,default:'NO'},
    extra_data_in_object_type:{type:mongoose.Schema.Types.Mixed,default:{}},
    extra_data_in_array_type:{type:Array,default:[]}
 
});

module.exports=mongoose.model('Backpacking_Road_Trip_Booking_Detail',booking_detail);