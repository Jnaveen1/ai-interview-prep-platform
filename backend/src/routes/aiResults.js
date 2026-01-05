const router = require("express").Router() ; 

const PreparationSession = require("../models/PreparationSession") ;
const GeneratedQuestion = require("../models/GeneratedQuestion") ;

router.post("/results" , async(req, res)=>{
    console.log("AI Results received: ", req.body) ;
    const {sessionId, technical, hr} = req.body ;

    if(!sessionId || !technical || !hr){
        return res.status(400).json({message : "sessionId, technical and hr fields are required"}) ;
    }

    try{
        const session = await PreparationSession.findById(sessionId) ;
        if(!session){
            return res.status(404).json({message : "Preparation session not found"}) ;
        }

        const questionToInsert = [] ; 

        technical.forEach((item)=>{
            questionToInsert.push({
                sessionId , 
                type : "TECHNICAL" ,
                question : item.question ,
                answer : item.answer
            }) ; 
        }) ; 

        hr.forEach((item)=>{
            questionToInsert.push({
                sessionId , 
                type : "HR" ,
                question : item.question ,
                answer : item.answer
            }) ; 
        }) ; 

        await GeneratedQuestion.insertMany(questionToInsert) ;

        session.status = "COMPLETED" ; 
        await session.save() ;
        return res.json({message : "AI results saved successfully"}) ;
        
    }catch(error){
        console.error(error) ;
        return res.status
    }

})

module.exports = router ;