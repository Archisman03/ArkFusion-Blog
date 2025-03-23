import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
}, {timestamps: true}  //timestamps is required as we can able to know when blogger update or posts his/her blog and we show that in website
);

// we can also create the model ans schema seperately which is a best practise
//created the user model
const User = mongoose.model('User', userSchema);
//export user model
export default User;