const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Backpacking_Trip_Tour_Guide_Info=require('../../models/Backpacking_Trip/backpacking_trip_tour_guide_info');

router.get('/get_backpacking_trip_tour_guide_info',(req,res)=>{

    Backpacking_Trip_Tour_Guide_Info.find()
    .populate(
        {
            path:'backpacking_trip_package_id',
            populate:{
                path:'backpacking_trip_travel_mode_id',
                model:'Backpacking_Trip_Travel_Mode',
                populate:{
                    path:'backpacking_trip_common_city_id',
                    model:'Backpacking_Trip_Common_City',
                    populate:{
                        path:'backpacking_trip_state_id',
                        model:'Backpacking_Trip_State'
                    }
                }         
            }
        }
    )
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

router.post('/add_user_booking_id_in_a_array',(req,res)=>{

    Backpacking_Trip_Tour_Guide_Info.find({
        backpacking_trip_package_id:req.body.backpacking_trip_package_id
    })
    .exec()
    .then(result=>{
        const arrayLength=result[0].bookings_id_array_for_this_particular_package.length;
          result[0].bookings_id_array_for_this_particular_package[arrayLength]=req.body.booking_id;

          Backpacking_Trip_Tour_Guide_Info.updateOne({
            backpacking_trip_package_id:req.body.backpacking_trip_package_id
          },
          {
            bookings_id_array_for_this_particular_package:result[0].bookings_id_array_for_this_particular_package

          })
          .exec()
          .then(data=>{
            res.json({
                message:'user booking id added successfully',
                data:data
            });
          });       
    })
    .catch(err=>{
        res.json({
            error:err
        });
    });
});

router.post('/post_backpacking_trip_tour_guide_info',(req,res)=>{

    const backpacking_trip_tour_guide_info= new Backpacking_Trip_Tour_Guide_Info({
        _id:new mongoose.Types.ObjectId(),
        phone_number:req.body.phone_number,
        email:req.body.email,
        backpacking_trip_package_id:req.body.backpacking_trip_package_id,
        package_id:req.body.package_id,
        webhook_url:req.body.webhook_url,
        user_ns:req.body.user_ns
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

//update
router.post('/update_backpacking_trip_tour_guide_info/:user_ns',(req,res)=>{

    Backpacking_Trip_Tour_Guide_Info.find({phone_number:req.body.phone_number,email:req.body.email})
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
            Backpacking_Trip_Tour_Guide_Info.updateOne({phone_number:req.body.phone_number,email:req.body.email},{user_ns:req.params.user_ns})
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
router.patch('/update_backpacking_trip_tour_guide_info',(req,res)=>{

    Backpacking_Trip_Tour_Guide_Info.updateOne({_id:req.body.backpacking_trip_tour_guide_id},{
        phone_number:req.body.phone_number,
        email:req.body.email,
        webhook_url:req.body.webhook_url,
        user_ns:req.body.user_ns

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

router.delete('/delete_backpacking_trip_tour_guide_info/:backpacking_trip_tour_guide_info',(req,res)=>{

    Backpacking_Trip_Tour_Guide_Info.deleteOne({_id:req.params.backpacking_trip_tour_guide_info})
    .exec()
    .then(result=>{
        console.log('tour guide info deleted');
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
        backpacking_trip_package_id:req.body.backpacking_trip_package_id
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