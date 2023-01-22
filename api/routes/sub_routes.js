const express=require('express');
const router=express.Router();

//Backpacking_Trip
const backpacking_trip_related_routes=require('./backpacking_trip_routes/backpacking_trip_subroutes');

//Bike_trip
//const bike_trip_related_routes=require('./bike_trip_routes');

//Weekend_trip
//const weekend_trip_related_routes=require('./weekend_trip_routes');

//User_related_routes
const user_related_routes=require('./user_related_routes/user_subroutes');

//Email_verification
const verification_related_routes=require('./verification_routes/verification_subroutes');

//Tour_Guide_Routes
const tour_guide_related_routes=require('./tour_guide_routes/tour_guide_subroutes');

//Payment_routes
const payment_related_routes=require('./payment_routes/payment_subroutes');

//Trip_Type_Routes
const trip_type_related_routes=require('./trip_type_routes/trip_type_subroutes');

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//backpacking_trip_related_routes
router.use('/backpacking_trip_related_routes',backpacking_trip_related_routes);

//bike_trip_routes
//router.use('/bike_trip_related_routes',bike_trip_related_routes);

//weekend_trip_routes
//router.use('/weekend_trip_related_routes',weekend_trip_related_routes);

//User_related_routes
router.use('/user_related_routes',user_related_routes);

//Email_verification_routes
router.use('/verification_related_routes',verification_related_routes);

//tour_guide_related_routes
router.use('/tour_guide_related_routes',tour_guide_related_routes);

//payment_related_routes
router.use('/payment_related_routes',payment_related_routes);

//trip_type_related_routes
router.use('/trip_type_related_routes',trip_type_related_routes);


module.exports=router;