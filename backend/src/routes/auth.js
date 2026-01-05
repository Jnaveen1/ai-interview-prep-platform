const router = require("express").Router() ; 

const bcrypt = require("bcryptjs") ; 
const jwt = require("jsonwebtoken") ;
const {body, validationResult} = require("express-validator") ;

const User = require("../models/User");

router.post("/register" , 
    [
        body("name").notEmpty().withMessage("Name is required") , 
        body("email").isEmail().withMessage("Valid emial required") , 
        body("password").isLength({min:8}).withMessage("Password must be atleast 8 characters long" , )
    ] , 
    async(req, res)=>{
        console.log("Received registration request") ;
        // const errors = validationResult(req) ; 
        // if(!errors.isEmpty()){
        //     return res.status(400).json({errors : errors.array()}) ; 
        // }

        console.log(req.body)
 
        const {name , email, password} = req.body ; 
        

        const normalizedEmail = email.toLowerCase().trim()  ; 
        console.log("Registering user:", normalizedEmail);

        try{
            console.log("HI")
            const existUser = await User.findOne({email : normalizedEmail}) ; 
            if(existUser){
                return res.status(400).json({message : "Registration Failed" }) ;
            }
            
            //Hash Password
            const salt = await bcrypt.genSalt(10) ; 
            const passwordHash = await bcrypt.hash(password , salt) ; 

            const user = await User.create({
                name, email : normalizedEmail, passwordHash , 
            }) ; 

            res.status(201).json({
                message : "User Registered Successfully" ,
                userId : user._id ,
            })
        }catch(error){
            console.error(error) ; 
            res.status(500).json({message : "Server Error"}) ;
        }   
    }
) ; 

router.post("/login", 
    [
        body("email").isEmail().withMessage("Valid emial required") , 
        body("password").notEmpty().withMessage("password Required") , 
    ] , 
    async(req, res)=>{
        const errors = validationResult(req) ; 
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()}) ; 
        }
        const {email, password} = req.body ; 
        const normalizedEmail = email.toLowerCase().trim()  ;
        try{
            const user = await User.findOne({email : normalizedEmail}) ;
            if(!user){
                return res.status(400).json({message : "Invalid Credentials"}) ;
            }
            const isMatch = await bcrypt.compare(password , user.passwordHash) ;
            if(!isMatch){
                return res.status(400).json({message : "Invalid Credentials"}) ;
            }

            const payload = {
                userId : user._id , 
            }
            const jwtToken = jwt.sign(payload , process.env.JWT_SECRET , {
                expiresIn : process.env.JWT_EXPIRES_IN ,
            })

            res.json({
                message : "login Successful" ,
                token : jwtToken ,
                user : {
                    id : user._id ,
                    name : user.name ,
                    email : user.email ,
                }, 
            }) ; 
        }catch(error){
            console.error(error) ; 
            res.status(500).json({message : "Server Error"}) ;
        }
    }
)

module.exports = router ; 