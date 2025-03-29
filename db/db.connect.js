const mongoose = require("mongoose")
require("dotenv").config()

const mongoUri = process.env.MONGODB

async function initilizeDatabase(){
    try{
        await mongoose.connect(mongoUri)
        console.log("Connected to Database.")

    }catch(error){
        console.log("Error connecting to Database.")
    }
}

module.exports = {initilizeDatabase}