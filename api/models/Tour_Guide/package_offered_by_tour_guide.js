const mongoose=require('mongoose')


const package_offered_by_tour_guide=mongoose.Schema({

    package_ref_id:{type:mongoose.Schema.Types.ObjectId,refPath:'package_model'},
    package_model:{type:mongoose.Schema.Types.String},
    tour_guide_information_id:{type:mongoose.Schema.Types.ObjectId,ref:'Tour_Guide_Information'}
});

module.exports=mongoose.model('Package_Offered_By_Tour_Guide',package_offered_by_tour_guide);