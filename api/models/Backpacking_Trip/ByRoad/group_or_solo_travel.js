const mongoose=require('mongoose');

const group_or_solo_travel=mongoose.Schema({

    package_ref_id:{type:mongoose.Schema.Types.ObjectId,ref:'Backpacking_Road_Trip_Package'},
    travel_grouping:{type:String}
});


module.exports=mongoose.model('Backpacking_Road_Trip_Group_Or_Solo_Trip',group_or_solo_travel);






                                        