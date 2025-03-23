const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config();  // Load environment variables

mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("DataBase is connected");
    }).catch((err) =>{
        console.log(err);
    })


const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})