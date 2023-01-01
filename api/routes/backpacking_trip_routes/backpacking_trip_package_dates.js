const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Backpacking_Trip_Package_Date=require('../../models/Backpacking_Trip/backpacking_trip_package_date');
const Backpacking_Trip_Package_Cost=require('../../models/Backpacking_Trip/backpacking_trip_package_cost');
const scheduler=require('node-schedule');
const { v4: uuidv4 } = require('uuid');

//route for uchat
router.get('/get_backpacking_trip_package_dates/:backpacking_trip_package_id',(req,res)=>{

    Backpacking_Trip_Package_Date.find({backpacking_trip_package_id:req.params.backpacking_trip_package_id})
    .exec()
    .then(result=>{
        res.json({
            data:result,
            count:result.length
        });
    })
    .catch(err=>{
        res.json({
            error:err
        });
    });

});


//route for retool admin panel
router.get('/get_backpacking_trip_package_dates',(req,res)=>{
    Backpacking_Trip_Package_Date.find()
    .populate({
        path:'backpacking_trip_package_id',
        populate:{
            path:'backpacking_trip_common_city_id',
            model:'Backpacking_Trip_Common_City',
            populate:{
                path:'backpacking_trip_state_id',
                model:'Backpacking_Trip_State'
            }
        }
    })
    .exec()
    .then(result=>{
        res.json({
            data:result,
            count:result.length
        });
    })
    .catch(err=>{
        res.json({
            error:err
        });
    });
});


router.post('/post_backpacking_trip_package_date',(req,res)=>{

    const newDateObject=new Date(req.body.date_of_journey);
    const date_toDateString=newDateObject.toDateString();
    const getFullYear=parseInt(newDateObject.getFullYear(),10);
    const getDate=parseInt(newDateObject.getDate(),10);
    const getMonth=parseInt(newDateObject.getMonth(),10);

    const newData=new Backpacking_Trip_Package_Date({

        _id:mongoose.Types.ObjectId(),
        backpacking_trip_package_id:req.body.backpacking_trip_package_id,
        date_of_journey:date_toDateString
    });


    newData.save()
    .then(result=>{

        console.log(getDate);
        console.log(getMonth);
        console.log(getFullYear);

        if(getMonth==4 || getMonth==6 || getMonth==7 || getMonth==9 || getMonth==11 && getDate==1)
        {
            console.log('i am here 1');
                const newDate=30;
                const newMonth=getMonth-1;
                const date1 = new Date(getFullYear,newMonth,newDate,16, 00, 00);
                console.log(date1);
                const job=uuidv4();
                scheduler.scheduleJob(`${job}`,date1,()=>{
                    deleteBackpackingTripPackageDate(date_toDateString,result._id); 
                    scheduler.cancelJob(`${job}`);                     
                });     
        }

        else if(getMonth==1 || getMonth==3 || getMonth==5 || getMonth==8 || getMonth==10 && getDate==1)
        {

                console.log('i am here 2');
                const newDate=31;
                const newMonth=getMonth-1;
                const date1 = new Date(getFullYear,newMonth,newDate,16,00,00);
                console.log(date1);
                const job=uuidv4();
                scheduler.scheduleJob(`${job}`,date1,()=>{
                    deleteBackpackingTripPackageDate(date_toDateString,result._id); 
                    scheduler.cancelJob(`${job}`);                     
                });    

        }

        else if(getDate==1 && getMonth==2)
        {
            if(getFullYear==2024 || getFullYear==2028 || getFullYear==2032 || getFullYear==2036 || getFullYear==2040)
            {

                console.log('i am here 4');
            
                const newDate=29;
                const newMonth=getMonth-1;
                const date1 = new Date(getFullYear,newMonth,newDate,16, 00, 00);
                console.log(date1);
                const job=uuidv4();
                scheduler.scheduleJob(`${job}`,date1,()=>{
                    deleteBackpackingTripPackageDate(date_toDateString,result._id); 
                    scheduler.cancelJob(`${job}`);                     
                });    
            }
            else
            {
                console.log('i am here 3');
                const newDate=28;
                const newMonth=getMonth-1;
                const date1 = new Date(getFullYear,newMonth,newDate,16, 00, 00);
                console.log(date1);
                const job=uuidv4();
                scheduler.scheduleJob(`${job}`,date1,()=>{
                    deleteBackpackingTripPackageDate(date_toDateString,result._id); 
                    scheduler.cancelJob(`${job}`);                     
                });    
                

            }
                
           
        }

        else if(getDate==1 && getMonth==0)
        {
            console.log('i am here 5');
            const newDate=31;
            const newMonth=11;
            const newFullYear=getFullYear-1;
            const date1 = new Date(newFullYear,newMonth,newDate,16, 00, 00);
            console.log(date1);
            const job=uuidv4();
            scheduler.scheduleJob(`${job}`,date1,()=>{
                deleteBackpackingTripPackageDate(date_toDateString,result._id); 
                scheduler.cancelJob(`${job}`);                     
            });    
        }

        else
        {
            console.log('i am here 6');
            const newDate=getDate-1;
            const date1 = new Date(getFullYear,getMonth,newDate,20,10,00);
            console.log(date1);
            const job=uuidv4();
            scheduler.scheduleJob(`${job}`,date1,()=>{
                deleteBackpackingTripPackageDate(date_toDateString,result._id); 
                scheduler.cancelJob(`${job}`);                     
            });    

        }

        res.json({
            message:'Data saved successfully',
            data:result
        });
    })
    .catch(err=>{
        res.json({
            error:err
        });
    });
});


const deleteBackpackingTripPackageDate=(date_toDateString,package_date_id)=>{

    Backpacking_Trip_Package_Date
    .deleteOne({date_of_journey:date_toDateString})
    .exec()
    .then(result=>{
        // scheduler.cancelJob('job1');
        console.log('date deleted successfully');
    }); 
    
    Backpacking_Trip_Package_Cost
    .deleteOne({backpacking_trip_package_date_id:package_date_id})
    .exec()
    .then(result=>{
        console.log('package cost deleted successfully');

    })

    

}



module.exports=router;