const express= require("express");
const { isAuthenticated } = require("../auth");
const Property= require("../models/Property");

const router= express.Router();


router.get("/",async(req,res)=>{
    try{
        const data = await Property.find();
        res.json({data})

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
    try{
        // const {propertyType,negotiable, price, ownership} = req.body;
        let PPDID="PPD"+ Math.floor(1000 + Math.random() * 9000)
        for(let i=0;;i++){
            let prop = await Property.findOne({PPDID})
            if(prop){
                continue
            }
            else break
        }
        let  property = await Property.create({...req.body,PPDID});
        res.json({property, message:"Property Added Succesfully"})
        
    }
    catch(e){
        res.json({e});
    }
});




module.exports = router;