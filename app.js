const express=require('express');
const app=express();
const port=process.env.PORT || 7000
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const cors=require('cors');
const sub_routes=require('./api/routes/sub_routes');
const adminRouter=require('./api/routes/admin.router');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
var randomstring = require("randomstring");


app.set('view engine','ejs');

app.listen(port,()=>{
    console.log(`listening to the port at ${port}`);
});

mongoose.connect('mongodb+srv://ghumakkadAdda:Mangodbservice%40ghumakkadadda@cluster0.qgpqrvv.mongodb.net/?retryWrites=true&w=majority')
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use(cors({
    origin:"*",
}));


app.get('/uploads/:filename',(req,res)=>{
    console.log(__dirname+'/uploads/'+req.params.filename);
     return res.sendFile(__dirname+'/uploads/'+req.params.filename);
});

app.post('/experiment',(req,res)=>{

    const actual_user_booking_id='GA'+String(randomstring.generate({
        length:12,
        charset:'numeric'
    }));

    console.log(uuidv4());
    console.log(actual_user_booking_id);
});

app.use('/api',sub_routes);
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
