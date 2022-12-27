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




router.post("/addProperty",isAuthenticated, async(req,res)=>{
    try{
        // const {propertyType,negotiable, price, ownership} = req.body;
        let  property = await Property.create(req.body);
        res.json({property, message:"Property Added Succesfully"})
        
    }
    catch(e){
        res.json({e});
    }
});

module.exports = router;