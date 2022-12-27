const express = require("express");
const mongodb = require("mongodb");
const mongoose = require('mongoose');
const app = express();

app.use(express.json());



// Connection To The Databse
mongoose.connect(
    "mongodb+srv://root:10xacademy@cluster0.hpnp08y.mongodb.net/?retryWrites=true&w=majority"
).then(() => console.log('Connected To the Database'));


const user = require("./routes/user")
app.use(user);

const property = require("./routes/property")
app.use(property);


app.listen(process.env.PORT || 5000, () => {
    console.log("Server running on port 5000");
});

