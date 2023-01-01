const mongoose=require('mongoose');


const bike_trip_package_cost=mongoose.Schema({

    bike_trip_package_date_id:{type:mongoose.Schema.Types.ObjectId,ref:'Bike_Trip_Package_Date'},
    package_cost:{type:Number}
});


module.exports=mongoose.model('Bike_Trip_Package_Cost',bike_trip_package_cost);