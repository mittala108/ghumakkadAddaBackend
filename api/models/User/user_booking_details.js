const mongoose=require('mongoose');


const user_booking_detail=mongoose.Schema({

    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User_Information'},
    booking_id:{type:mongoose.Schema.Types.ObjectId,refPath:'booking_id_model'},
    booking_id_model:{type:mongoose.Schema.Types.String}
});


module.exports=mongoose.model('User_Booking_Detail',user_booking_detail);