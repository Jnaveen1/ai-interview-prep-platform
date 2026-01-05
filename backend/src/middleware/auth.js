const jwt = require("jsonwebtoken") ; 

const middleware = (req, res, next)=>{
    const authHeader = req.header("Authorization") ; 
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({message : "Authorization Denied" }) ;
    }
    const token = authHeader.split(" ")[1] ; 
    try{
        const verifyToken = jwt.verify(token , process.env.JWT_SECRET) ; 
        console.log(verifyToken) ; 
        req.user = verifyToken.userId ; 
        next() ; 
    }
    catch(error){
        res.status(401).json({message : "Token is not valid"}) ; 
    }
} ; 

module.exports = middleware ;
