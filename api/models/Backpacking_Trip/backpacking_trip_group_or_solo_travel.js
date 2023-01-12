const mongoose=require('mongoose');

const backpacking_trip_group_or_solo_travel=mongoose.Schema({

    backpacking_trip_package_id:{type:mongoose.Schema.Types.ObjectId,ref:'Backpacking_Trip_Package'},
    travel_grouping:{type:String}
});


module.exports=mongoose.model('Backpacking_Trip_Group_Or_Solo_Trip',backpacking_trip_group_or_solo_travel);






                                        