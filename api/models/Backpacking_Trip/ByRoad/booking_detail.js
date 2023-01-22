const mongoose=require('mongoose');

const booking_detail=mongoose.Schema({

    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User_Informaton'},
    booking_id:{type:String},
    communication_channel:{type:String},
    package_ref_id:{type:mongoose.Schema.Types.ObjectId,ref:'Backpacking_Road_Trip_Package'},
    date_of_journey:{type:Date},
    group_or_solo_travel:{type:String},
    no_of_bookings:{type:Number},
    total_amount_paid:{type:Number},
    model_name:{type:String,default:'Backpacking_Road_Trip_Booking_Detail'},
    cost_of_package:{type:Number},
    payment_details_id:{type:mongoose.Schema.Types.ObjectId,ref:'Payment_Detail'},
    refund_demand:{type:String,default:'NO'},
    user_ns:{type:String,default:'',required:false}
 
});

module.exports=mongoose.model('Backpacking_Road_Trip_Booking_Detail',booking_detail);