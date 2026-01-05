const express = require("express") ; 
const cors = require("cors") ; 

const app = express() ; 

const authMiddleware = require("./middleware/auth") ;
app.use(cors()) ; 
app.use(express.json()) ; 

app.use("/auth" , (require("./routes/auth"))) ; 
app.get("/protected" , authMiddleware , (req, res)=>{
    console.log(req.user)
    res.json(
        {
            message : "This is a protected route" ,
            userId : req.user ,
        }
    )
})

app.use("/sessions" , require("./routes/sessions")) ;

app.use("/ai", require("./routes/aiResults")) ;

module.exports = app ; 
