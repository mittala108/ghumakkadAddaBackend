const mongoose=require('mongoose');

const payment_detail=mongoose.Schema({
    
    razorpay_order_id:{type:String},
    razorpay_payment_id:{type:String},
    razorpay_signature:{type:String},
    date_of_payment:{type:Date},
    razorpay_invoice_id:{type:String}

});

module.exports=mongoose.model('Payment_Detail',payment_detail);