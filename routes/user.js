const express= require("express")
const User= require("../models/User")

const router= express.Router()



// router.get("/",(req,res)=>{


//     res.send("user succefully logged in")
// })

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
        if(password==user.password){
            res.json({user, message:"logged in succesfully"})
        }
        else {
            res.json({message:"password does not match"})
        }

    } catch (error) {
        res.json({
            messgae:error.message
        })
    }

})


module.exports = router