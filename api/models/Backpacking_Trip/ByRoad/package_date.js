const mongoose=require('mongoose');

const package_date=mongoose.Schema({

    date_of_journey:{type:String},
    package_ref_id:{type:mongoose.Schema.Types.ObjectId,ref:'Backpacking_Road_Trip_Package'},
    
    
});

module.exports=mongoose.model('Backpacking_Road_Trip_Package_Date',package_date);