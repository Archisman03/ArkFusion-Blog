const { z } = require('zod');
const { User } = require('../models/user.model');
const bcrypt = require('bcrypt');
const { errorHandler } = require('../utils/error');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


const signUp = async (req, res, next) => {
    //using zod
    const requireBody = z.object({
        username: z.string().min(3).max(30),
        email: z.string().email(),
        password: z.string().min(5).max(30)
    })

    /**safeParse() validates the input against the schema and returns an object:
        If valid, it returns { success: true, data }.
        If invalid, it returns { success: false, error } */
    const parseData = requireBody.safeParse(req.body);
    // if (!parseData.success) {
    //     res.json({
    //         msg: "Incorrect Format"
    //     })
    //     return;
    // }
    //or it's right way of checking parse Data:
    if (!parseData.success) {
        return res.status(400).json({ message: "Incorrect Format" });
    }

    const { username, email, password } = req.body;

    try {
        //Hasing the password //see in the body your password in in string format
        const hashpwd = await bcrypt.hash(password, 10);// (password written by user, saltrounds)
        // console.log(hashpwd);

        await User.create({
            username,
            email,
            password:hashpwd
        })
        //or
        // const newUser = new User({
        //     username,
        //     email,
        //     password
        // });
        // await newUser.save();
        
        res.json({
            msg: "signUp Successfully"
        })

    } catch (err) {
        //it's using the global error handling middleware wriiten in index.js
        next(err);
        //it's using seperate error handling middleware written seperately
        // next(errorHandler(err.statusCode,err.message));
        //or mormal sending error:
        // res.status(404).json({ message: "Not found" });
    }
}

/**
 * If you just want to insert a document quickly → Use User.create().

    If you need to modify the user before saving (e.g., hashing passwords, setting timestamps, adding defaults manually) → Use new User() + .save().
    Mane new user() likhar por ar save age edit korte chaile korte parbo
*/

const signIn = async (req, res, next)=>{
    const {email, password} = req.body;
    if(!email || !password || email==='' || password ===''){
        next(errorHandler(400,'All fields are required to filled'));
    }
    try{
        const validUser= await User.findOne({
            email:email
        })

        if (!validUser) {
            return next(errorHandler(404, 'INVALID USER'));
        }

        // Compare password securely
        const pwd = await bcrypt.compare(password, validUser.password);
        if(!pwd)
           return next(errorHandler(404,'Wrong Password'));

        //Generating jwt token
        const token = jwt.sign({id: validUser._id}, process.env.JWT_Secret);
        
        //in response password will also get displayed so to hide it:
        const {password: pass, ...rest} = validUser._doc;

        res.status(200)
        // C:\Users\ARCHISMAN GOSWAMI\OneDrive\Desktop\ArkFusion-Blog\Notes\cookies\3.png 
        .cookie('access_token', token, {
            httpOnly: true,
        })
        .json(rest) //instead sending .json(validUser) we will send rest where password is being hided

    }catch(err){
        next(errorHandler(err.statusCode, err.message));
    }
    
}
module.exports ={signUp, signIn};