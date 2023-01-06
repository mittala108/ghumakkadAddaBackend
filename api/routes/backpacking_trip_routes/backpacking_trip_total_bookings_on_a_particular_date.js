const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Backpacking_Trip_Total_Booking_On_A_Particular_Date=require('../../models/Backpacking_Trip/backpacking_trip_total_booking_on_a_particular_date');
var randomstring = require("randomstring");


router.get('/get_backpacking_trip_total_bookings_on_a_particular_date',(req,res)=>{

   Backpacking_Trip_Total_Booking_On_A_Particular_Date.find()
   .populate({
      path:'backpacking_trip_package_id',
      populate:{
          path:'backpacking_trip_common_city_id',
          model:'Backpacking_Trip_Common_City',
          populate:{
              path:'backpacking_trip_state_id',
              model:'Backpacking_Trip_State'
          }
      }
  })
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


router.post('/add_backpacking_trip_bookings_on_a_particular_date',(req,res)=>{

      const actual_trip_id='TI'+String(randomstring.generate({
         length:13,
         charset:'numeric'
      }));

    Backpacking_Trip_Total_Booking_On_A_Particular_Date.find({
       state:req.body.state,
       common_city:req.body.common_city,
       backpacking_trip_package_id:req.body.backpacking_trip_package_id,
       date_of_journey:new Date(req.body.date_of_journey)
    })
    .exec()
    .then(data=>{
       if(!data.length)
       {
 
          const backpacking_trip_total_booking_on_a_particular_date=new Backpacking_Trip_Total_Booking_On_A_Particular_Date({
 
            _id:new mongoose.Types.ObjectId(),
            state:req.body.state,
            common_city:req.body.common_city,
            backpacking_trip_package_id:req.body.backpacking_trip_package_id,
            date_of_journey:req.body.date_of_journey,
            trip_id:actual_trip_id,
            total_bookings:req.body.total_bookings
          });
 
          backpacking_trip_total_booking_on_a_particular_date.bookings_id_array_for_this_particular_date.push(req.body.booking_id);
 
 
 
          backpacking_trip_total_booking_on_a_particular_date.save()
          .then(result=>{
             res.json({
                message:"new data saved",
                response:result
             })
          })
 
       }
 
       else
       {
          const total_bookings=data[0].total_bookings+parseInt(req.body.total_bookings,10);
          const arrayLength=data[0].bookings_id_array_for_this_particular_date.length;
          data[0].bookings_id_array_for_this_particular_date[arrayLength]=req.body.booking_id;
 
          Backpacking_Trip_Total_Booking_On_A_Particular_Date.updateOne({
            state:req.body.state,
            common_city:req.body.common_city,
            backpacking_trip_package_id:req.body.backpacking_trip_package_id,
            date_of_journey:new Date(req.body.date_of_journey)
          
          },
             {
                total_bookings:total_bookings,
                bookings_id_array_for_this_particular_date:data[0].bookings_id_array_for_this_particular_date
             })
          .exec()
          .then(result=>{
             res.json({
                message:"total_bookings updated",
                response:result
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
 
 
 module.exports=router;