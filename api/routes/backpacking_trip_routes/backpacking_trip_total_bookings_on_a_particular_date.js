const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Backpacking_Trip_Total_Booking_On_A_Particular_Date=require('../../models/Backpacking_Trip/backpacking_trip_total_booking_on_a_particular_date');



router.post('/add_backpacking_trip_bookings_on_a_particular_date',(req,res)=>{

    Backpacking_Trip_Total_Booking_On_A_Particular_Date.find({
       state:req.body.state,
       common_city:req.body.common_city,
       package_id:req.body.package_id,
       date:req.body.date
    })
    .exec()
    .then(data=>{
       if(!data.length)
       {
 
          const backpacking_trip_total_booking_on_a_particular_date=new Backpacking_Trip_Total_Booking_On_A_Particular_Date({
 
            _id:new mongoose.Types.ObjectId(),
            state:req.body.state,
            common_city:req.body.common_city,
            package_id:req.body.package_id,
            date:req.body.date,
            total_bookings:req.body.total_bookings
          });
 
          backpacking_trip_total_booking_on_a_particular_date.extra_data_in_array_type.push(req.body.user_booking_Id);
 
 
 
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
          const arrayLength=data[0].extra_data_in_array_type.length;
          data[0].extra_data_in_array_type[arrayLength]=req.body.user_booking_Id;
 
          Backpacking_Trip_Total_Booking_On_A_Particular_Date.updateOne({
            state:req.body.state,
            common_city:req.body.common_city,
            package_id:req.body.package_id,
            date:req.body.date
          
          },
             {
                total_bookings:total_bookings,
                extra_data_in_array_type:data[0].extra_data_in_array_type
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