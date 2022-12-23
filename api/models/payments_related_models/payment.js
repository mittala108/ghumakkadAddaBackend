const mongoose=require('mongoose');

const payment=mongoose.Schema({
    
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

module.exports=mongoose.model('Payment',payment);