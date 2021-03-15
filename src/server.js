var express = require("express");
var app = express();
require('dotenv').config()



app.get('/', (req,res) => {
    res.status(200).send({status: "Server is running!"})
})



app.listen(process.env.PORT, (server) => {
    console.log(`app is listening at http://localhost:${process.env.PORT}`)
})