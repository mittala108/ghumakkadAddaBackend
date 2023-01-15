const mongoose=require('mongoose');

const backpacking_road_trip_payment_detail=mongoose.Schema({
    
    razorpay_order_id:{type:String},
    razorpay_payment_id:{type:String},
    razorpay_signature:{type:String},
    date_of_payment:{type:Date},
    razorpay_invoice_id:{type:String},
    extra_data_in_object_type:{type:mongoose.Schema.Types.Mixed,default:{}},
    extra_data_in_array_type:{type:Array,default:[]}

});

module.exports=mongoose.model('Backpacking_Road_Trip_Payment_Detail',backpacking_road_trip_payment_detail);