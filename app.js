const express=require('express');
const app=express();
const port=process.env.PORT || 8000
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const cors=require('cors');
const sub_routes=require('./api/routes/sub_routes');
const adminRouter=require('./api/routes/admin.router');
require('dotenv').config();

app.set('view engine','ejs');

app.listen(port,()=>{
    console.log(`listening to the port at ${port}`);
});

mongoose.connect('mongodb+srv://mittala108:Ytrewq12%40@cluster0.noefbqj.mongodb.net/?retryWrites=true&w=majority')
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use(cors({
    origin:"*",
}))


app.get('/uploads/:filename',(req,res)=>{
    console.log(__dirname+'/uploads/'+req.params.filename);
     return res.sendFile(__dirname+'/uploads/'+req.params.filename);
});

app.get('/experiment/:date/:package_no_of_days',(req,res)=>{

    console.log(req.params.date,req.params.package_no_of_days);

    const date_of_journey=new Date(req.params.date);
    const getFullYear=parseInt(date_of_journey.getFullYear(),10);
    const getDate=parseInt(date_of_journey.getDate(),10);
    const getMonth=parseInt(date_of_journey.getMonth(),10);
    const package_no_of_days=String(req.params.package_no_of_days);
    const package_date=parseInt(package_no_of_days.charAt(2),10);
    


    const number_nm=getDate+package_date+1;
    console.log(date_of_journey,getFullYear,getDate,getMonth,package_date,number_nm);


        if(getMonth==0 || getMonth==2 || getMonth==4 || getMonth==6 || getMonth==7 || getMonth==9)
        {
            console.log('hello');
            if(number_nm>31)
            {
                console.log('dhdhdhdh');
                const newDate=number_nm-31;
                const getMonthnew=getMonth+1;
                console.log(newDate,getMonthnew);
                const date1 = new Date(getFullYear,getMonthnew,newDate,12, 00, 00).toLocaleString(undefined,{timeZone:'Asia/Kolkata'});
                console.log(date1);
                        
                    
            }

            else if(number_nm<31)
            {
                const date1 = new Date(getFullYear,getMonth,number_nm,12, 00, 00).toLocaleString(undefined,{timeZone:'Asia/Kolkata'});
                
                        console.log(date1);
                        

            }
        }

        else if(getMonth==3 || getMonth==5 || getMonth==8 || getMonth==10)
        {

            if(number_nm>30)
            {
                const newDate=number_nm-30;
                const getMonthnew=getMonth+1;
                const date1 = new Date(getFullYear,getMonthnew,newDate,12, 00, 00).toLocaleString(undefined,{timeZone:'Asia/Kolkata'});
                    
                        console.log(date1);
    
            }

            else if(number_nm<30)
            {
                const date1 = new Date(getFullYear,getMonth,number_nm,12, 00, 00).toDateString();
                
                        console.log(date1);
                    

            }

        }

        else if(getMonth==1 && getFullYear!="2024" || getFullYear!='2028')
        {
            if(number_nm>28)
            {
                const newDate=number_nm-28;
                const getMonthnew=getMonth+1;
                const date1 = new Date(getFullYear,getMonthnew,newDate,12, 00, 00).toLocaleString(undefined,{timeZone:'Asia/Kolkata'});
                    
                        console.log(date1);
                
            }

            else if(number_nm<28)
            {

    
                const date1 = new Date(getFullYear,getMonth,number_nm,12, 00, 00).toLocaleString(undefined,{timeZone:'Asia/Kolkata'});
                    
                        console.log(date1);
                        

            }
        }

        else if(getMonth==1 && getFullYear=="2024" || getFullYear=='2028')
        {
            if(number_nm>29)
            {
                const newDate=number_nm-29;
                const getMonthnew=getMonth+1;
                const date1 = new Date(getFullYear,getMonthnew,newDate,12, 00, 00).toLocaleString(undefined,{timeZone:'Asia/Kolkata'});
                    
                        console.log(date1);
                        
            }

            else if(number_nm<29)
            {

    
                const date1 = new Date(getFullYear,getMonth,number_nm,12, 00, 00).toLocaleString(undefined,{timeZone:'Asia/Kolkata'});
                    
                        console.log(date1);
                        

            }
        }


})

app.use('/admin/sub_routes',sub_routes);
app.use('/admin',adminRouter);



app.use((req,res,next)=>{
    const error=new Error('Not found');
    error.status=406;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });
});
