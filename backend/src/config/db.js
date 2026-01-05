const mongoose = require("mongoose") ; 

const connectDB = async() =>{
    try{
        console.log("MONGO_URI:", process.env.MONGO_URI);

        await mongoose.connect(process.env.MONGO_URI) ; 
        console.log("Mongo Connection is Successful") ;
    }catch(error){
        console.error("Mongo Connection Failed : ", error.message) ;
        process.exit(1) ;
    }
}

module.exports = connectDB