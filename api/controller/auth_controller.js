const { z } = require('zod');
const { User } = require('../models/user.model');
const bcrypt = require('bcrypt');
const { errorHandler } = require('../utils/error');


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

module.exports = { signUp };
/**
 * If you just want to insert a document quickly → Use User.create().

    If you need to modify the user before saving (e.g., hashing passwords, setting timestamps, adding defaults manually) → Use new User() + .save().
    Mane new user() likhar por ar save age edit korte chaile korte parbo
 */