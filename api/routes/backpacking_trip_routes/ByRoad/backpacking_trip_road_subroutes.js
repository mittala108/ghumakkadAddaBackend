const express=require('express');
const router=express.Router();

//road_trip
const road_trip_packages=require('./files/packages');
const road_trip_group_or_solo_travelling=require('./files/group_or_solo_travelling');
const road_trip_package_dates=require('./files/package_dates');
const road_trip_packages_cost=require('./files/packages_cost');
const road_trip_booking_details=require('./files/booking_details');



//road_trip
router.use('/packages',road_trip_packages);
router.use('/group_or_solo_travelling',road_trip_group_or_solo_travelling);
router.use('/package_dates',road_trip_package_dates);
router.use('/packages_cost',road_trip_packages_cost);
router.use('/booking_details',road_trip_booking_details);



module.exports=router;