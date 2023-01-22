const express=require('express');
const router=express.Router();



//trip_type_routes
const trip_types=require('./files/trip_types');



//trip_typ_related_routes

router.use('/trip_types',trip_types);