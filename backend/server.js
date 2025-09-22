const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');


dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/transactions',transactionRoutes);

app.get('/',(req,res)=>{
    res.send('Finance Tracker API is running...');
});

mongoose.connect(process.env.MONGO_URI).then
(()=>{console.log("Mongodb connected");
    app.listen(process.env.PORT||5000,()=>{
        console.log(`server running on port ${process.env.PORT || 5000}`);
    });
}).catch(err=>console.error(err));