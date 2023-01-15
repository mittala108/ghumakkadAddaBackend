const AdminBro=require('admin-bro');
const expressAdminBro=require('admin-bro-expressjs');
const mongooseAdminBro=require('admin-bro-mongoose');

//models registeration
const backpacking_trip_state=require('../models/Backpacking_Trip/backpacking_trip_state');
const backpacking_trip_common_city=require('../models/Backpacking_Trip/backpacking_trip_common_city');
const backpacking_trip_travel_mode=require('../models/Backpacking_Trip/backpacking_trip_travel_mode');
const backpacking_road_trip_package=require('../models/Backpacking_Trip/by_road_travel_mode_models/road_trip_package');
const backpacking_road_trip_package_date=require('../models/Backpacking_Trip/by_road_travel_mode_models/road_trip_package_date');
const backpacking_road_trip_tour_guide_info=require('../models/Backpacking_Trip/by_road_travel_mode_models/road_trip_tour_guide_info');
const backpacking_road_trip_user_booking_detail=require('../models/Backpacking_Trip/by_road_travel_mode_models/road_trip_user_booking_detail');
const backpacking_road_trip_package_cost=require('../models/Backpacking_Trip/by_road_travel_mode_models/road_trip_package_cost');
const backpacking_road_trip_payment_detail=require('../models/Backpacking_Trip/by_road_travel_mode_models/road_trip_payment_detail');
const backpacking_road_trip_group_or_solo_travel=require('../models/Backpacking_Trip/by_road_travel_mode_models/road_trip_group_or_solo_travel');


const user=require('../models/user_models/user');

AdminBro.registerAdapter(mongooseAdminBro)

const AdminBroOptions={
    
    resources:[
        user,
        backpacking_trip_state,
        backpacking_trip_common_city,
        backpacking_trip_travel_mode,
        backpacking_road_trip_package,
        backpacking_road_trip_package_date,
        backpacking_road_trip_tour_guide_info,
        backpacking_road_trip_user_booking_detail,
        backpacking_road_trip_package_cost,
        backpacking_road_trip_payment_detail,
        backpacking_road_trip_group_or_solo_travel
    ]
}

const adminBro=new AdminBro(AdminBroOptions);
const router=expressAdminBro.buildRouter(adminBro)


module.exports=router