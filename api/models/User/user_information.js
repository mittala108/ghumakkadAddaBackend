const mongoose=require('mongoose');

const user =mongoose.Schema({ 

     phone_number:{type:String},
     name:{type:String},
     date_of_joining:{type:Date},
     email:{type:String},
     extra_data_in_object_type:{type:mongoose.Schema.Types.Mixed,default:{}},
     extra_data_in_array_type:{type:Array,default:[]}
    });



module.exports=mongoose.model('User_Information',user);