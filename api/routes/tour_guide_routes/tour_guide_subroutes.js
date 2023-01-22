const express=require('express');
const router=express.Router();


//tour_guuide_related_routes
const tour_guide_informations=require('./files/tour_guide_informations');
const packages_offered_by_tour_guide=require('./files/packages_offered_by_tour_guide');
const booking_ids_for_a_particular_package=require('./files/booking_ids_for_a_particular_package');



//tour_guide_related_routes

router.use('/tour_guide_informations',tour_guide_informations);
router.use('/packages_offered_by_tour_guide',packages_offered_by_tour_guide);
router.use('/booking_ids_for_a_particular_package',booking_ids_for_a_particular_package);


module.exports=router;