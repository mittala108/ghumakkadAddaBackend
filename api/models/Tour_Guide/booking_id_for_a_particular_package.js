const mongoose=require('mongoose');


const booking_id_for_a_particular_package=mongoose.Schema({

    booking_id:{type:mongoose.Schema.Types.ObjectId,refPath:'booking_model'},
    booking_model:{type:mongoose.Schema.Types.String},
    package_offered_by_tour_guide_id:{type:mongoose.Schema.Types.ObjectId,ref:'Package_Offered_By_Tour_Guide'}

});


module.exports=mongoose.model('Booking_Id_For_A_Particular_Package',booking_id_for_a_particular_package);