const AdminBro=require('admin-bro');
const expressAdminBro=require('admin-bro-expressjs');
const mongooseAdminBro=require('admin-bro-mongoose');

//models registeration
const backpacking_trip_state=require('../models/Backpacking_Trip/state');
const backpacking_trip_common_city=require('../models/Backpacking_Trip/common_city');
const backpacking_trip_travel_mode=require('../models/Backpacking_Trip/travel_mode');
const backpacking_road_trip_package=require('../models/Backpacking_Trip/ByRoad/package');
const backpacking_road_trip_package_date=require('../models/Backpacking_Trip/ByRoad/package_date');
const backpacking_road_trip_user_booking_detail=require('../models/Backpacking_Trip/ByRoad/booking_detail');
const backpacking_road_trip_package_cost=require('../models/Backpacking_Trip/ByRoad/package_cost');
const backpacking_road_trip_group_or_solo_travel=require('../models/Backpacking_Trip/ByRoad/group_or_solo_travel');

const payment_detail=require('../models/Payment/payment_detail');

const tour_guide_information=require('../models/Tour_Guide/tour_guide_information');
const package_offeref_by_tour_guide=require('../models/Tour_Guide/package_offered_by_tour_guide');
const booking_ids_for_a_particular_package=require('../models/Tour_Guide/booking_id_for_a_particular_package');

const user_information=require('../models/User/user_information');
const user_booking_details=require('../models/User/user_booking_details');

AdminBro.registerAdapter(mongooseAdminBro)

const AdminBroOptions={
    
    resources:[
        user_information,
        backpacking_trip_state,
        backpacking_trip_common_city,
        backpacking_trip_travel_mode,
        backpacking_road_trip_package,
        backpacking_road_trip_package_date,
        backpacking_road_trip_user_booking_detail,
        backpacking_road_trip_package_cost,
        backpacking_road_trip_group_or_solo_travel,
        payment_detail,
        tour_guide_information,
        package_offeref_by_tour_guide,
        booking_ids_for_a_particular_package,
        user_booking_details
    ]
}

const adminBro=new AdminBro(AdminBroOptions);
const router=expressAdminBro.buildRouter(adminBro)


module.exports=router