const mongoose=require('mongoose');


const weekend_trip_package_date=mongoose.Schema({

    weekend_trip_package_id:{type:mongoose.Schema.Types.ObjectId,ref:'Weekend_Trip_Package'},
    date:{type:Date}

});

module.exports=mongoose.model('Weekend_Trip_Package_Date',weekend_trip_package_date);