const mongoose=require('mongoose');

const backpacking_road_trip_group_or_solo_travel=mongoose.Schema({

    backpacking_road_trip_package_id:{type:mongoose.Schema.Types.ObjectId,ref:'Backpacking_Road_Trip_Package'},
    travel_grouping:{type:String}
});


module.exports=mongoose.model('Backpacking_Road_Trip_Group_Or_Solo_Trip',backpacking_road_trip_group_or_solo_travel);






                                        