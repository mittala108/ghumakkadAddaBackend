const mongoose=require('mongoose');

const backpacking_trip_user_booking_detail=mongoose.Schema({

    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    booking_id:{type:String},
    name:{type:String},
    communication_channel:{type:String},
    phone_number:{type:String},
    email:{type:String},
    state:{type:String},
    common_city:{type:String},
    travel_mode:{type:String},
    backpacking_trip_package_id:{type:mongoose.Schema.Types.ObjectId,ref:'Backpacking_Trip_Package'},
    date_of_journey:{type:Date},
    travel_grouping:{type:String},
    no_of_bookings:{type:Number},
    total_amount_paid:{type:Number},
    cost_of_package:{type:Number},
    date_of_booking:{type:Date},
    payment_details_id:{type:mongoose.Schema.Types.ObjectId,ref:'Backpacking_Trip_Payment_Detail'},
    razorpay_payment_id:{type:String},
    razorpay_order_id:{type:String},
    razorpay_invoice_id:{type:String},
    refund_demand:{type:String,default:'NO'},
    extra_data_in_object_type:{type:mongoose.Schema.Types.Mixed,default:{}},
    extra_data_in_array_type:{type:Array,default:[]}
 
});

module.exports=mongoose.model('Backpacking_Trip_User_Booking_Detail',backpacking_trip_user_booking_detail);