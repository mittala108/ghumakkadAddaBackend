const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Backpacking_Trip_Tour_Guide_Info=require('../../models/Backpacking_Trip/backpacking_trip_tour_guide_info');



router.post('/post_backpacking_trip_tour_guide_info',(req,res)=>{

    const backpacking_trip_tour_guide_info= new Backpacking_Trip_Tour_Guide_Info({
        _id:new mongoose.Types.ObjectId(),
        phone_number:req.body.phone_number,
        email:req.body.email,
        package_id:req.body.package_id,
        webhook_url:req.body.webhook_url
    });

    backpacking_trip_tour_guide_info.save()
    .then(result=>{
        res.json({
            message:'backpacking_trip_tour_guide_info_data_saved_successfully',
            data:result
        });
    })
    .catch(err=>{
        res.json({
            error:err
        });
    });

});


router.get('/get_backpacking_trip_tour_guide_info/:package_id',(req,res)=>{
    Backpacking_Trip_Tour_Guide_Info.find({
        package_id:req.params.package_id
    })
    .exec()
    .then(result=>{
        res.json({
            data:result
        });
    })
    .catch(err=>{
        res.json({
            error:err
        });
    });
});

router.get('/send_data_to_backpacking_trip_tour_guide',(req,res)=>{
    
    Backpacking_Trip_Tour_Guide_Info.find({
        package_id:req.body.package_id
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