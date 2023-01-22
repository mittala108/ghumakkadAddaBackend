const express=require('express');
const router=express.Router();


//backpacking_trip_routes
const states=require('./common_files/states');
const common_cities=require('./common_files/common_cities');
const travel_modes=require('./common_files/travel_modes');
const backpacking_trip_road_subroutes=require('./ByRoad/backpacking_trip_road_subroutes');



//backpacking_trip_routes
router.use('/states',states);
router.use('/common_cities',common_cities);
router.use('/travel_modes',travel_modes);
router.use('/by_road_travel_mode',backpacking_trip_road_subroutes);


module.exports=router;