const mongoose=require('mongoose');

const bike_trip_package_date=mongoose.Schema({

    bike_trip_package_id:{type:mongoose.Schema.Types.ObjectId,ref:'Bike_Trip_Package'},
    date:{type:String}

});

module.exports=mongoose.model('Bike_Trip_Package_Date',bike_trip_package_date);