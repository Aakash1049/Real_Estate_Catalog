const express= require("express")
const jwt = require("jsonwebtoken")
const User= require("../models/User")
const jwt = require("jsonwebtoken")

const router= express.Router()


router.post("/signUp",async (req,res)=>{

    try {
        let {email, password, confirmpassword} = req.body
        if(password!==confirmpassword){
            return res.json({
                message:"Password and confirm password does not match"
            })
        }
        let user = await User.findOne({email})
        if(user){
            return res.send("user already exits")
        }
        user= await User.create({email,password})
        res.json({user, message:"Account created"})
    } catch (error) {
        res.json({
            messgae:error.message
        })
    }

})

router.post("/signIn",async (req,res)=>{

    try {
        let {email, password} = req.body
        let user = await User.findOne({email})
        if(!user){
           return res.json({
                message:"user does not exists"
            })
        }        
        if(password!=user.password){
            res.json({message:"password does not match"})
        }
        else {
            token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
            res.json({user,token, message:"logged in succesfully"})
        }

    } catch (error) {
        res.json({
            messgae:error.message
        })
    }

})


module.exports = router