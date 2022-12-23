const mongoose=require('mongoose');

const backpacking_trip_package_date=mongoose.Schema({

    backpacking_trip_package_id:{type:mongoose.Schema.Types.ObjectId,ref:'Backpacking_Trip_Package'},
    date:{type:Date}

});

module.exports=mongoose.model('Backpacking_Trip_Package_Date',backpacking_trip_package_date);