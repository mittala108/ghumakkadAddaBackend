const mongoose=require('mongoose');


const backpacking_trip_package_cost=mongoose.Schema({

    backpacking_trip_package_date_id:{type:mongoose.Schema.Types.ObjectId,ref:'Backpacking_Trip_Package_Date'},
    date_of_journey:{type:Date},
    backpacking_trip_group_or_solo_travel_id:{type:mongoose.Schema.Types.ObjectId,ref:'Backpacking_Trip_Group_Or_Solo_Trip'},
    package_cost:{type:Number}
});


module.exports=mongoose.model('Backpacking_Trip_Package_Cost',backpacking_trip_package_cost);