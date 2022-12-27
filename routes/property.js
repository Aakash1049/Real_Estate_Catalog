const express= require("express");
const Property= require("../models/Property");

const router= express.Router();

router.post("/addProperty",async(req,res)=>{
    try{
        const {propertyType,negotiable, price, ownership} = req.body;
        let  property = await Property.create({propertyType,negotiable, price, ownership});
        res.json({property, message:"Property Added Succesfully"})
        
    }
    catch(e){
        res.json({e});
    }
});

module.exports = router;