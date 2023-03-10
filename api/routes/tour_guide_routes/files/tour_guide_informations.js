const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Tour_Guide_Information=require('../../../models/Tour_Guide/tour_guide_information');

router.get('/get_tour_guide_information_fields',(req,res)=>{

    Tour_Guide_Information.find()
    .exec()
    .then(result=>{
        res.json({
            data:result,
            count:result.length
        });
    })
    .catch(err=>{
        res.json({
            error:err
        });
    });
});



router.post('/post_tour_guide_information_fields',(req,res)=>{

    const tour_guide_information= new Tour_Guide_Information({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        phone_number:req.body.phone_number,
        email:req.body.email,
        webhook_url:req.body.webhook_url,
        more_information:req.body.more_information
    });

    tour_guide_information.save()
    .then(result=>{
        res.json({
            message:'tour_guide_information_data_saved_successfully',
            data:result
        });
    })
    .catch(err=>{
        res.json({
            error:err
        });
    });

});

//update
router.patch('/update_tour_guide_information_fields/:user_ns',(req,res)=>{

    Tour_Guide_Information.find({phone_number:req.body.phone_number,email:req.body.email})
    .exec()
    .then(result=>{
        if(result.length==0)
        {
            res.json({
                message:'sorry! your information is not verified'
            });
        }
        else
        {
            Tour_Guide_Information.updateOne({phone_number:req.body.phone_number,email:req.body.email},{user_ns:req.params.user_ns})
            .exec()
            .then(result1=>{
                res.json({
                    message:'Your Data has been verified',
                    data:result1
                });
            });
        }
    })
    .catch(err=>{
        res.json({
            error:err
        });
    });
});

//update
router.patch('/update_tour_guide_information_fields',(req,res)=>{

    Tour_Guide_Information.updateOne({_id:req.body.tour_guide_id},{
        name:req.body.name,
        phone_number:req.body.phone_number,
        email:req.body.email,
        webhook_url:req.body.webhook_url,
        user_ns:req.body.user_ns,
        more_information:req.body.more_information

    })
    .exec()
    .then(result=>{
        res.json({
            message:'data updated successfully'
        });
    })
    .catch(err=>{
        res.json({
            error:err
        });
    });
});


router.get('/send_data_to_tour_guide',(req,res)=>{
    
    Tour_Guide_Information.find({
        package_ref_id:req.body.package_ref_id
    })
    .exec()
    .then(result2=>{


      const data={
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "plain_text",
                        "text": "new lead with details below"
                    }
                },

                {
                    "type": "section",
                    "text": {
                        "type": "plain_text",
                        "text": `trip_Id---${req.body.trip_Id}`
                    }
                },
            
                {
                    "type": "section",
                    "text": {
                        "type": "plain_text",
                        "text": `email---${req.body.email}`
                    }
            
                },
            
                {
                    "type": "section",
                    "text": {
                        "type": "plain_text",
                        "text": `phone_number---${req.body.phone_number}`
                    }
                },

                {
                    "type": "section",
                    "text": {
                        "type": "plain_text",
                        "text": `name---${req.body.name}`
                    }
                },

                {
                    "type": "section",
                    "text": {
                        "type": "plain_text",
                        "text": `state---${req.body.state}`
                    }
                },

                {
                    "type": "section",
                    "text": {
                        "type": "plain_text",
                        "text": `city---${req.body.common_city}`
                    }
                },

                {
                    "type": "section",
                    "text": {
                        "type": "plain_text",
                        "text": `package_id---${req.body.package_id}`
                    }
                },

                {
                    "type": "section",
                    "text": {
                        "type": "plain_text",
                        "text": `package_name---${req.body.package_name}`
                    }
                },

                {
                    "type": "section",
                    "text": {
                        "type": "plain_text",
                        "text": `package_description---${req.body.pckage_description}`
                    }
                },

                {
                    "type": "section",
                    "text": {
                        "type": "plain_text",
                        "text": `no_of_bookings---${req.body.no_of_bookings}`
                    }
                },

                {
                    "type": "section",
                    "text": {
                        "type": "plain_text",
                        "text": `date_of_journey---${req.body.date_of_journey}`
                    }
                }          
            ]
            
            };

        fetch(`${result2[0].webhook_url}`,{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        });

    })
    .catch(err=>{
        res.json({
            erroe:err
        });
    });

});



module.exports=router;