const express=require('express');
const { builtinModules } = require('module');
const router=express.Router();



//trip_type_routes
const trip_types=require('./files/trip_types');



//trip_typ_related_routes

router.use('/trip_types',trip_types);



module.exports=router;