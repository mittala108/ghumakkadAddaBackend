const express=require('express');
const router=express.Router();

//Backpacking_Trip
const backpacking_trip_states=require('./backpacking_trip_routes/backpacking_trip_states');
const backpacking_trip_common_cities=require('./backpacking_trip_routes/backpacking_trip_common_cities');
const backpacking_trip_packages=require('./backpacking_trip_routes/backpacking_trip_packages');
const backpacking_trip_package_dates=require('./backpacking_trip_routes/backpacking_trip_package_dates');
const backpacking_trip_total_bookings_on_a_particular_date=require('./backpacking_trip_routes/backpacking_trip_total_bookings_on_a_particular_date');
const backpacking_trip_tour_guide_infos=require('./backpacking_trip_routes/backpacking_trip_tour_guide_infos');
const backpacking_trip_users_booking_detail=require('./backpacking_trip_routes/backpacking_trip_users_booking_detail');
const backpacking_trip_payment_details=require('./backpacking_trip_routes/backpacking_trip_payment_details');
const backpacking_trip_packages_cost=require('./backpacking_trip_routes/backpacking_trip_packages_cost');
const backpacking_trip_group_or_solo_travelling=require('./backpacking_trip_routes/backpacking_trip_group_or_solo_travelling');
const backpacking_trip_travel_modes=require('./backpacking_trip_routes/backpacking_trip_travel_modes');


//Bike_trip
const bike_trip_common_cities=require('./bike_trip_routes/bike_trip_common_cities');
const bike_trip_packages=require('./bike_trip_routes/bike_trip_packages');
const bike_trip_package_dates=require('./bike_trip_routes/bike_trip_package_dates');
const bike_trip_total_bookings_on_a_particular_date=require('./bike_trip_routes/bike_trip_total_bookings_on_a_particular_date');
const bike_trip_tour_guide_infos=require('./bike_trip_routes/bike_trip_tour_guide_infos');
const bike_trip_users_booking_detail=require('./bike_trip_routes/bike_trip_users_booking_detail');
const bike_trip_payment_details=require('./bike_trip_routes/bike_trip_payment_details');
const bike_trip_packages_cost=require('./bike_trip_routes/bike_trip_packages_cost');

//Weekend_trip

const Weekend_trip_common_cities=require('./weekend_trip_routes/weekend_trip_common_cities');
const weekend_trip_packages=require('./weekend_trip_routes/weekend_trip_packages');
const weekend_trip_package_dates=require('./weekend_trip_routes/weekend_trip_package_dates');
const weekend_trip_total_bookings_on_a_particular_date=require('./weekend_trip_routes/weekend_trip_total_bookings_on_a_particular_date');
const weekend_trip_tour_guide_infos=require('./weekend_trip_routes/weekend_trip_tour_guide_infos');
const weekend_trip_users_booking_detail=require('./weekend_trip_routes/weekend_trip_users_booking_detail');
const weekend_trip_payment_details=require('./weekend_trip_routes/weekend_trip_payment_details');
const weekend_trip_packages_cost=require('./weekend_trip_routes/weekend_trip_packages_cost');

//User_related_routes
const users=require('./user_related_routes/users');

//Email_verification
const email_verification=require('./verification_routes/email_verification');
const phone_number_verification=require('./verification_routes/phone_number_verification')

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//backpacking_trip_related_routes
router.use('/backpacking_trip_related_routes/backpacking_trip_common_cities',backpacking_trip_common_cities);
router.use('/backpacking_trip_related_routes/backpacking_trip_states',backpacking_trip_states);
router.use('/backpacking_trip_related_routes/backpacking_trip_packages',backpacking_trip_packages);
router.use('/backpacking_trip_related_routes/backpacking_trip_package_dates',backpacking_trip_package_dates);
router.use('/backpacking_trip_related_routes/backpacking_trip_total_bookings_on_a_particular_date',backpacking_trip_total_bookings_on_a_particular_date);
router.use('/backpacking_trip_related_routes/backpacking_trip_tour_guide_infos',backpacking_trip_tour_guide_infos);
router.use('/backpacking_trip_related_routes/backpacking_trip_users_booking_detail',backpacking_trip_users_booking_detail);
router.use('/backpacking_trip_related_routes/backpacking_trip_payment_details',backpacking_trip_payment_details);
router.use('/backpacking_trip_related_routes/backpacking_trip_packages_cost',backpacking_trip_packages_cost);
router.use('/backpacking_trip_related_routes/backpacking_trip_travel_modes',backpacking_trip_travel_modes);
router.use('/backpacking_trip_related_routes/backpacking_trip_group_or_solo_travelling',backpacking_trip_group_or_solo_travelling);

//bike_trip_routes
router.use('/bike_trip_related_routes/bike_trip_copmmon_cities',bike_trip_common_cities);
router.use('/bike_trip_related_routes/bike_trip_packages',bike_trip_packages);
router.use('/bike_trip_related_routes/bike_trip_package_dates',bike_trip_package_dates);
router.use('/bike_trip_related_routes/bike_trip_total_bookings_on_a_particular_date',bike_trip_total_bookings_on_a_particular_date);
router.use('/bike_trip_related_routes/bike_trip_tour_guide_infos',bike_trip_tour_guide_infos);
router.use('/bike_trip_related_routes/bike_trip_users_booking_detail',bike_trip_users_booking_detail);
router.use('/bike_trip_related_routes/bike_trip_payment_details',bike_trip_payment_details);
router.use('/bike_trip_related_routes/bike_trip_packages_cost',bike_trip_packages_cost);

//weekend_trip_routes
router.use('/weekend_trip_related_routes/weekend_trip_common_cities',Weekend_trip_common_cities);
router.use('/weekend_trip_related_routes/weekend_trip_packages',weekend_trip_packages);
router.use('/weekend_trip_related_routes/weekend_trip_package_dates',weekend_trip_package_dates);
router.use('/weekend_trip_related_routes/weekend_trip_total_bookings_on_a_particular_date',weekend_trip_total_bookings_on_a_particular_date);
router.use('/weekend_trip_related_routes/weekend_trip_tour_guide_infos',weekend_trip_tour_guide_infos);
router.use('/weekend_trip_related_routes/weekend_trip_users_booking_detail',weekend_trip_users_booking_detail);
router.use('/weekend_trip_related_routes/weekend_trip_payment_details',weekend_trip_payment_details);
router.use('/weekend_trip_related_routes/weekend_trip_packages_cost',weekend_trip_packages_cost);

//User_related_routes
router.use('/user_related_routes/users',users);

//Email_verification_routes
router.use('/verification_related_routes/email_verification',email_verification);
router.use('/verification_related_routes/phone_number_verification',phone_number_verification);

module.exports=router;