import {Link} from 'react-router-dom' ; 
import './index.css'

function StartPage(){
    return(
        <div className='main-container'>
            <div className='sub-container'> 
                <Link to = '/register' className='link'>
                    <button className='btn'>Register</button>
                </Link>
                
                <Link to = '/login' className='link'>
                    <button className='btn'>Login</button>
                </Link>

            </div>
        </div>
    )

}

export default StartPage