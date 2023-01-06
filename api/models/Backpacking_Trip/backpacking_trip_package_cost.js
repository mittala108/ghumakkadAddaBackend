const mongoose=require('mongoose');


const backpacking_trip_package_cost=mongoose.Schema({

    backpacking_trip_package_date_id:{type:mongoose.Schema.Types.ObjectId,ref:'Backpacking_Trip_Package_Date'},
    date_of_journey:{type:Date},
    group_or_solo_travel:{type:String},
    package_cost:{type:Number}
});


module.exports=mongoose.model('Backpacking_Trip_Package_Cost',backpacking_trip_package_cost);