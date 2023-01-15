const mongoose=require('mongoose');


const backpacking_road_trip_package_cost=mongoose.Schema({

    backpacking_road_trip_package_date_id:{type:mongoose.Schema.Types.ObjectId,ref:'Backpacking_Road_Trip_Package_Date'},
    backpacking_road_trip_group_or_solo_travel_id:{type:mongoose.Schema.Types.ObjectId,ref:'Backpacking_Road_Trip_Group_Or_Solo_Trip'},
    package_cost:{type:Number}
});


module.exports=mongoose.model('Backpacking_Road_Trip_Package_Cost',backpacking_road_trip_package_cost);