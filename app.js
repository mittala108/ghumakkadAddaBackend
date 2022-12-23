const express=require('express');
const app=express();
const port=process.env.PORT || 8000
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const cors=require('cors');
const sub_routes=require('./api/routes/sub_routes');
const adminRouter=require('./api/routes/admin.router');
const cron=require('node-cron');
const scheduler=require('node-schedule');


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

app.get('/experiment1',(req,res)=>{

    res.json({
        message:'new data'
    });

    const date1 = new Date(2022, 11, 20, 21, 01, 00).toLocaleString(undefined,{timeZone:'Asia/Kolkata'});
    scheduler.scheduleJob('job1',date1,()=>{
        console.log('heelkk');
        scheduler.cancelJob('job1');
    });

    console.log("hello");

    
});

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
