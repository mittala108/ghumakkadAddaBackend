const express=require('express');
const router=express.Router();

//road_trip
const road_trip_packages=require('../backpacking_trip_routes/by_road_travel_mode_routes/road_trip_packages');
const road_trip_group_or_solo_travelling=require('../backpacking_trip_routes/by_road_travel_mode_routes/road_trip_group_or_solo_travelling');
const road_trip_package_dates=require('../backpacking_trip_routes/by_road_travel_mode_routes/road_trip_package_dates');
const road_trip_packages_cost=require('../backpacking_trip_routes/by_road_travel_mode_routes/road_trip_packages_cost');
const road_trip_payment_details=require('../backpacking_trip_routes/by_road_travel_mode_routes/road_trip_payment_details');
const road_trip_tour_guide_infos=require('../backpacking_trip_routes/by_road_travel_mode_routes/road_trip_tour_guide_infos');
const road_trip_booking_details=require('../backpacking_trip_routes/by_road_travel_mode_routes/road_trip_booking_details');











//road_trip
router.use('/packages',road_trip_packages);
router.use('/group_or_solo_travelling',road_trip_group_or_solo_travelling);
router.use('/package_dates',road_trip_package_dates);
router.use('/packages_cost',road_trip_packages_cost);
router.use('/payment_details',road_trip_payment_details);
router.use('/tour_guide_infos',road_trip_tour_guide_infos);
router.use('/booking_details',road_trip_booking_details);




module.exports=router;