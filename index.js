const express = require("express");
const mongodb = require("mongodb");
const mongoose = require('mongoose');
const app = express();

app.use(express.json());



// Connection To The Databse
mongoose.connect(
    "mongodb+srv://root:10xacademy@cluster0.hpnp08y.mongodb.net/?retryWrites=true&w=majority/test"
).then(() => console.log('Connected To the Database'));

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on port 3000");
});

