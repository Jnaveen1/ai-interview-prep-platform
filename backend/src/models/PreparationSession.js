const mongoose = require("mongoose") ; 

const preparationSessionSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "User" , 
        required : true , 
    } , 
    resumeText : {
        type : String , 
        required : true , 
    }, 
    jobDescription : {
        type : String , 
        required : true ,   
    }, 
    status : {
        type : String , 
        enum : ["PENDING", "COMPLETED", "FAILED"] , 
        default : "PENDING" ,
    }, 
}, 
    { 
        timestamps : true 
    }

)

module.exports = mongoose.model("PreparationSession" , preparationSessionSchema) ;