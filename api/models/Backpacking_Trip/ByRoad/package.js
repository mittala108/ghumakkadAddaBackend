const mongoose=require('mongoose');

const package=mongoose.Schema({
    
    package_id:{type:String},
    travel_mode_id:{type:String},
    travel_mode:{type:String},
    common_city:{type:String},
    state:{type:String},
    package_model_name:{type:String,default:'Backpacking_Road_Trip_Package'},
    package_front_image_path:{type:String},
    package_details_web_url:{type:String},
    package_details_pdf_path:{type:String},
    package_name:{type:String},
    package_description:{type:String},
    package_number_of_days:{type:String},
    is_available:{type:Boolean,default:1},
    package_offered_by:{type:String}

});

module.exports=mongoose.model('Backpacking_Road_Trip_Package',package);