import { useState } from "react";
import api from '../../services/api' ;
import {useNavigate} from 'react-router-dom' ;


function Login() {
  const [email , setEmail] = useState("") ; 
  const [password , setPassword] = useState("") ;
  const [loading , setLoading] = useState(false) ; 
  const [error , setError] = useState("") ; 

  const navigate = useNavigate() ;

  const handleLogin = async () =>{
    console.log("Attempting login with email: " , email) ;
    try{
        setLoading(true) ; 
        setError("") ;
        const response = await api.post("/auth/login" , {
            email , 
            password , 
        }) ; 
        const token = response.data.token ; 
        console.log("Received token: " , token) ;
        localStorage.setItem("token" , token) ; 

        navigate("/home") ; 
    }catch (err) {
  console.log("LOGIN ERROR:", err);
  console.log("RESPONSE:", err.response);

  setError(
    err.response?.data?.message ||
    err.message ||
    "Login failed"
  );
}
finally{
        setLoading(false) ; 
    }
  }
  
  return(
    <div className="main-container">
      <form className="form-container">
        <h2>Login</h2>
        <input 
            type = "email"
            placeholder="Email" 
            value = {email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <input 
            type = "password"
            placeholder="Password"
            value = {password}
            onChange={(e)=>setPassword(e.target.value)}
        />
        <button disabled = {loading} onClick = {handleLogin} >
            {loading ? "Logging in..." : "Login"}
        </button>       
        {error && <p style={{color: "red"}}>{error}</p>}
        <p>Not Registered? <a href="/register">Register</a></p>
      </form>
    </div>
  ); 

}

export default Login;
