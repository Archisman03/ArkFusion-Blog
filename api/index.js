const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const userRoutes = require('./routes/user.route.js');
const authRoutes = require('./routes/auth.route.js')

dotenv.config();  // Load environment variables

// console.log("MongoDB URI:", process.env.MONGO);  // Debugging

// mongoose.connect("mongodb+srv://admin:Arka0303@cluster0.2xc4q.mongodb.net/")
//or 
mongoose.connect(process.env.MONGO)
    .then(()=>{
        console.log("DataBase is connected");
    }).catch((err) =>{
        console.log(err);
    })


const app = express();

// Middleware should be before listen
app.use(express.json()); // ✅ Parse JSON requests

app.use('/api/user', userRoutes); //http://localhost:3000/api/user/test

app.use('/api/auth', authRoutes);

// ✅ Global Error Handling Middleware (should be after routes)
app.use((err, req, res, next) => {
    // console.error(err); // Log the error for debugging
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        statusCode,
        message: err.message || "Internal Server Error"
    });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000')
})