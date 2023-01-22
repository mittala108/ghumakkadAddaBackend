const mongoose=require('mongoose');

const tour_guide_info=mongoose.Schema({
    
    name:{type:String},
    phone_number:{type:String},
    email:{type:String},
    webhook_url:{type:String,default:''},
    user_ns:{type:String,default:null,required:false},
    is_available:{type:Boolean,default:1},
    more_information:{type:String,required:false}
});



module.exports=mongoose.model('Tour_Guide_Information',tour_guide_info);