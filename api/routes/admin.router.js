const AdminBro=require('admin-bro');
const expressAdminBro=require('admin-bro-expressjs');
const mongooseAdminBro=require('admin-bro-mongoose');

//models registeration
const backpacking_trip_state=require('../models/Backpacking_Trip/backpacking_trip_state');
const backpacking_trip_common_city=require('../models/Backpacking_Trip/backpacking_trip_common_city');
const backpacking_trip_package=require('../models/Backpacking_Trip/backpacking_trip_package');
const backpacking_trip_package_date=require('../models/Backpacking_Trip/backpacking_trip_package_date');
const backpacking_trip_tour_guide_info=require('../models/Backpacking_Trip/backpacking_trip_tour_guide_info');
const backpacking_trip_total_booking_on_a_particular_date=require('../models/Backpacking_Trip/backpacking_trip_total_booking_on_a_particular_date');
const backpacking_trip_user_booking_detail=require('../models/Backpacking_Trip/backpacking_trip_user_booking_detail');
const backpacking_trip_package_cost=require('../models/Backpacking_Trip/backpacking_trip_package_cost');
const backpacking_trip_payment_detail=require('../models/Backpacking_Trip/backpacking_trip_payment_detail');
const backpacking_trip_travel_mode=require('../models/Backpacking_Trip/backpacking_trip_travel_mode');
const backpacking_trip_group_or_solo_travel=require('../models/Backpacking_Trip/backpacking_trip_group_or_solo_travel');


const bike_trip_common_city=require('../models/Bike_Trip/bike_trip_common_city');
const bike_trip_package=require('../models/Bike_Trip/bike_trip_package');
const bike_trip_package_date=require('../models/Bike_Trip/bike_trip_package_date');
const bike_trip_tour_guide_info=require('../models/Bike_Trip/bike_trip_tour_guide_info');
const bike_trip_total_booking_on_a_particular_date=require('../models/Bike_Trip/bike_trip_total_booking_on_a_particular_date');
const bike_trip_user_booking_detail=require('../models/Bike_Trip/bike_trip_user_booking_detail');

const weekend_trip_common_city=require('../models/Weekend_Trip/weekend_trip_common_city');
const weekend_trip_package=require('../models/Weekend_Trip/weekend_trip_package');
const weekend_trip_package_date=require('../models/Weekend_Trip/weekend_trip_package_date');
const weekend_trip_tour_guide_info=require('../models/Weekend_Trip/weekend_trip_tour_guide_info');
const weekend_trip_total_booking_on_a_particular_date=require('../models/Weekend_Trip/weekend_trip_total_booking_on_a_particular_date');
const weekend_trip_user_booking_detail=require('../models/Weekend_Trip/weekend_trip_user_booking_detail');

const user=require('../models/user_models/user');

AdminBro.registerAdapter(mongooseAdminBro)

const AdminBroOptions={
    
    resources:[
        user,
        backpacking_trip_state,
        backpacking_trip_common_city,
        backpacking_trip_travel_mode,
        backpacking_trip_package,
        backpacking_trip_package_date,
        backpacking_trip_group_or_solo_travel,
        backpacking_trip_package_cost,
        backpacking_trip_tour_guide_info,
        backpacking_trip_payment_detail,
        backpacking_trip_total_booking_on_a_particular_date,
        backpacking_trip_user_booking_detail,
        

        bike_trip_common_city,
        bike_trip_package,
        bike_trip_package_date,
        bike_trip_tour_guide_info,
        bike_trip_total_booking_on_a_particular_date,
        bike_trip_user_booking_detail,
        weekend_trip_common_city,
        weekend_trip_package,
        weekend_trip_package_date,
        weekend_trip_tour_guide_info,
        weekend_trip_total_booking_on_a_particular_date,
        weekend_trip_user_booking_detail
    ]
}

const adminBro=new AdminBro(AdminBroOptions);
const router=expressAdminBro.buildRouter(adminBro)


module.exports=router