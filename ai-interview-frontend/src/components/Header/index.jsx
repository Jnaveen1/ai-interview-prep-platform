import './index.css'

import {Link , useNavigate} from 'react-router-dom' ; 

function Header(){
    const navigate = useNavigate() ;

    const handleLogout = () =>{
        console.log("Logging out user") ;
        localStorage.removeItem("token") ;
        navigate("/login") ; 
    } ; 
    return(
        <header className='header'>
            <h3 className="logo">
                <Link to = "/home" className = "nav-link">
                    AI Interview Copilot
                </Link>
            </h3>
            <nav className='nav'>
                <Link to = "/prepare" className = "nav-link">
                    Prepare  Interview
                </Link>
                <Link to = "/sessions" className = "nav-link">
                    Previous Sessions 
                </Link>
                <button onClick = {handleLogout} className = "logout-btn">
                    Logout 
                </button>
            </nav>
        </header>
    )
}

export default Header ;