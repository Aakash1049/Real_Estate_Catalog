const express= require("express");
const { isAuthenticated } = require("../auth");
const Property= require("../models/Property");

const router= express.Router();


router.get("/getAllProperties",async(req,res)=>{
    console.log("enterned backend")
    try{
        const data = await Property.find();
        res.json(data)

    }catch(e){
        res.json({e});
    }
})


router.get("/search",async(req,res)=>{ 
    let pattern= new RegExp("^"+req.body.search)    
    let property = await Property.find({PPDID:{$regex:pattern}})
    res.json({property})
})

router.post("/addProperty",isAuthenticated, async(req,res)=>{
    console.log(req.body, "Before Setting");
    try{
        // const {propertyType,negotiable, price, ownership} = req.body;
        let PPDID
        for(let i=0;;i++){
            PPDID="PPD"+ Math.floor(1000 + Math.random() * 9000)
            let prop = await Property.findOne({PPDID})
            if(prop){
                continue
            }
            else break
        }
        let  property = await Property.create({...req.body.data,PPDID});
        // console.log(req.body, property,  "After Setting")
        res.json({property, message:"Property Added Succesfully"})
        
    }
    catch(e){
        console.log("err is here")
        res.json({error:e.message});
    }
});




module.exports = router;