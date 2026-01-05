const mongoose = require("mongoose") ;

const generatedQuestionSchema = new mongoose.Schema({
    sessionId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "PreparationSession" ,
        required : true ,
    } ,
    type : {
        type : String ,
        enum : ["TECHNICAL", "HR"] ,
        required : true ,
    }, 
    question : {
        type : String , 
        required : true , 
    }, 
    answer : {
        type : String ,
        required : true ,
    }, 
} , 
    { 
        timestamps : true 
    }
) ;

module.exports = mongoose.model("GeneratedQuestion" , generatedQuestionSchema) ;