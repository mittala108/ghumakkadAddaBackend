const mongoose=require('mongoose');

const backpacking_trip_package_date=mongoose.Schema({

    date_of_journey:{type:String},
    backpacking_trip_package_id:{type:mongoose.Schema.Types.ObjectId,ref:'Backpacking_Trip_Package'},
    
    
});

module.exports=mongoose.model('Backpacking_Trip_Package_Date',backpacking_trip_package_date);