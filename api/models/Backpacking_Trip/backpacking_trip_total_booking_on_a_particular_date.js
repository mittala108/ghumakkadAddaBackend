const mongoose=require('mongoose');

const backpacking_trip_total_booking_on_a_particular_date=mongoose.Schema({

    state:{type:String},
    common_city:{type:String},
    package_id:{type:mongoose.Schema.Types.ObjectId,ref:'Backpacking_Trip_Package'},
    date:{type:Date},
    total_bookings:{type:Number,default:0},
    extra_data_in_object_type:{type:mongoose.Schema.Types.Mixed,default:{}},
    extra_data_in_array_type:{type:Array,default:[]}


});


module.exports=mongoose.model('Backpacking_Trip_Total_Booking_On_A_Particular_Date',backpacking_trip_total_booking_on_a_particular_date);
