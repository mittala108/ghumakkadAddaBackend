const mongoose=require('mongoose');

const backpacking_trip_payment_detail=mongoose.Schema({
    
    amount:{type:Number},
    customer_email:{type:String},
    razorpay_order_Id:{type:String},
    customer_phone_number:{type:String},
    razorpay_payment_Id:{type:String},
    razorpay_signature:{type:String},
    date_of_payment:{type:Date},
    extra_data_in_object_type:{type:mongoose.Schema.Types.Mixed,default:{}},
    extra_data_in_array_type:{type:Array,default:[]}

});

module.exports=mongoose.model('Backpacking_Trip_Payment_Detail',backpacking_trip_payment_detail);