const mongoose=require('mongoose');


const weekend_trip_package_cost=mongoose.Schema({

    weekend_trip_package_date_id:{type:mongoose.Schema.Types.ObjectId,ref:'Weekend_Trip_Package_Date'},
    package_cost:{type:Number}
});


module.exports=mongoose.model('Weekend_Trip_Package_Cost',weekend_trip_package_cost);