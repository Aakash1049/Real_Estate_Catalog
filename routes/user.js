const express= require("express")
const User= require("../models/User")

const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const bodyparser = require("body-parser");

const router= express.Router();

router.post("/signUp",
    body('email').isEmail(),
    body('password').isLength({ min: 8, max: 16 }),
    body('confirmpassword').isLength({ min: 8, max: 16 }),async (req, res) => {
    try {

        const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

        let {email, password, confirmpassword} = req.body
        if(password!==confirmpassword){
            return res.json({
                message:"Password and confirm password does not match"
            })
        }
        let user = await User.findOne({email})
        if(user){
            return res.send("user already exits")
        };

        bcrypt.hash(password, 10, async function(err, hash){
            // It Will Store hash in the password DB.

            if (err) {
                return res.status(500).json({
                    status: "Failed",
                    message: err.message
                })
            }

            user= await User.create({
                
                email: email,                        // It will return the user value in these format
                password: hash
            })
            res.json({user, message:"Account created"})


        })

       
    } catch (error) {
        res.json({
            messgae:error.message
        })
    }

})

router.post("/signIn",
body('email').isEmail(),
async (req,res)=>{

    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        let {email, password} = req.body
        let user = await User.findOne({email})
        if(!user){
           return res.json({
                message:"user does not exists"
            })
        } 

        // if(password!=user.password){
        //     res.json({message:"password does not match"})
        // }

        // Load hash from your password DB.

        bcrypt.compare(password, user.password, function(err, result){
            if(err){
                return res.status(500).json({
                    status:"Failed",
                    message:err.message
                })
            }
            if(result){
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
                res.json({user,token, message:"logged in succesfully"})
            }
            else if(password!=user.password){
                return res.status(405).json({
                    status:"Incorrect Password"
                })
            }
        })
        

    } catch (error) {
        res.json({
            messgae:error.message
        })
    }

})


module.exports = router