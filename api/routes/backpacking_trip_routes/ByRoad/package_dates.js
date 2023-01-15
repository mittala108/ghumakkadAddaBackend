const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Package_Date=require('../../../models/Backpacking_Trip/ByRoad/package_date');
const Package_Cost=require('../../../models/Backpacking_Trip/ByRoad/package_cost');
const fetch=require('node-fetch');

//route for uchat
router.get('/get_package_dates_fields/:package_ref_id',(req,res)=>{

    Package_Date.find({package_ref_id:req.params.package_ref_id})
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
router.get('/get_package_dates_fields',(req,res)=>{
    Package_Date.find()
    .populate({
            path:'package_ref_id',
            populate:{
                path:'travel_mode_id',
                model:'Backpacking_Trip_Travel_Mode',
                populate:{
                    path:'common_city_id',
                    model:'Backpacking_Trip_Common_City',
                    populate:{
                        path:'state_id',
                        model:'Backpacking_Trip_State'
                    }
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


router.post('/post_package_date_fields',(req,res)=>{

    const newDateObject=new Date(req.body.date_of_journey);
    const date_toDateString=newDateObject.toDateString();
    const getFullYear=parseInt(newDateObject.getFullYear(),10);
    const getDate=parseInt(newDateObject.getDate(),10);
    const getMonth=parseInt(newDateObject.getMonth(),10);

    const newData=new Package_Date({

        _id:mongoose.Types.ObjectId(),
        package_ref_id:req.body.package_ref_id,
        date_of_journey:date_toDateString
    });

    newData.save()
    .then(result=>{

        if(getMonth==4 || getMonth==6 || getMonth==7 || getMonth==9 || getMonth==11)
        {
            if(getDate==1)
            {
                console.log('i am here 1');
                const newDate=30;
                const newMonth=getMonth-1;
                const date1 = new Date(getFullYear,newMonth,newDate,10, 30, 00);
                console.log(date1);
                schedulerJobCallFunction(date1,result._id);

            }

            else
            {
                console.log('i am here 11');
                const newDate=getDate-1;
                const date1=new Date(getFullYear,getMonth,newDate,10,30,00);
                console.log(date1);
                schedulerJobCallFunction(date1,result._id);

            }          
        }

        else if(getMonth==1 || getMonth==3 || getMonth==5 || getMonth==8 || getMonth==10)
        {
            if(getDate==1)
            {
                console.log('i am here 2');
                const newDate=31;
                const newMonth=getMonth-1;
                const date1 = new Date(getFullYear,newMonth,newDate,10,30,00);
                console.log(date1);  
                schedulerJobCallFunction(date1,result._id); 

            }

            else
            {
                console.log('i am here 22');
                const newDate=getDate-1;
                const date1=new Date(getFullYear,getMonth,newDate,10,30,00);
                console.log(date1);
                schedulerJobCallFunction(date1,result._id);

            }
        }

        else if(getDate==1 && getMonth==2)
        {
            if(getFullYear==2024 || getFullYear==2028 || getFullYear==2032 || getFullYear==2036 || getFullYear==2040)
            {

                console.log('i am here 4');
            
                const newDate=29;
                const newMonth=getMonth-1;
                const date1 = new Date(getFullYear,newMonth,newDate,10, 30, 00);
                console.log(date1); 
                schedulerJobCallFunction(date1,result._id);
                 
            }
            else
            {
                console.log('i am here 3');
                const newDate=28;
                const newMonth=getMonth-1;
                const date1 = new Date(getFullYear,newMonth,newDate,10,30, 00);
                console.log(date1);   
                schedulerJobCallFunction(date1,result._id);
            }
                
           
        }

        else if(getDate==1 && getMonth==0)
        {
            console.log('i am here 5');
            const newDate=31;
            const newMonth=11;
            const newFullYear=getFullYear-1;
            const date1 = new Date(newFullYear,newMonth,newDate,10, 30, 00);
            console.log(date1);
            schedulerJobCallFunction(date1,result._id);
                
        }

        else
        {
            console.log('i am here 6');
            const newDate=getDate-1;
            const date1 = new Date(getFullYear,getMonth,newDate,10,30,00);
            console.log(date1);
            schedulerJobCallFunction(date1,result._id);
            
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


router.delete('/delete_date_and_cost_from_database/:package_date_id',(req,res)=>{

    console.log('date and cost delete function');

    Package_Date
    .deleteOne({_id:req.params.package_date_id})
    .exec()
    .then(result=>{
        res.json({
            message:'date deleted successfully'
        });
        console.log('date deleted successfully');
    }); 
    
    Package_Cost
    .deleteOne({package_date_id:req.params.package_date_id})
    .exec()
    .then(result=>{
        console.log('package cost deleted successfully');

    })
    .catch(err=>{
        console.log(err);
    })

});


const schedulerJobCallFunction=(date1,package_date_id)=>{

    fetch(`http://65.1.3.56:9000/schedule_jobs/delete_date_scheduler/delete_scheduler_backpacking_trip/${date1}/${package_date_id}`,{
        method:'GET'
    }); 
    
}



module.exports=router;