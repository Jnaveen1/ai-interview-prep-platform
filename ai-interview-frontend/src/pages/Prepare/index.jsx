import {useState} from 'react' ; 

import Header from '../../components/Header' ;
import './index.css' ;
import api from '../../services/api' ;

function Prepare(){
    const [resumeFile , setResumeFile] = useState(null) ;
    const [jobDescription , setJobDescrription] = useState("") ; 
    const [loading , setLoading] = useState(false) ; 
    const [error , setError] = useState("") ;
    const [success , setSuccess] = useState("") ; 

    const handleSubmit = async()=>{
        console.log("Submitting resume and job description: " , resumeFile , jobDescription) ;
        if(!resumeFile || !jobDescription){
            setError("Please provide both resume and job description.") ;
            return ;
        }
        try{
            setLoading(true) ;
            setError("") ;
            setSuccess("") ;
            const formData = new FormData() ; 
            formData.append("resume", resumeFile) ;
            formData.append("jobDescription" , jobDescription) ;
            await api.post("/sessions" , formData) ; 
            setSuccess(true);
            setResumeFile(null) ;
            setJobDescrription("") ;
        }catch(err){
            setError(
                err.response?.data?.message || 
                err.message || 
                "Submission failed. Please try again."
            ) ;
        }finally{
            setLoading(false) ;
        }
    }
    return(
        <div className = "main-container">
            <Header />
            <div className = "prepare-container">
                <h2>Prepare for Your Interview</h2>
                <div className = "form-group">
                    <label>Upload Resume(PDF / DOC / DOCX)</label>
                    <input 
                        type = "file"
                        accept = ".pdf,.doc,.docx"
                        onChange={(e)=>setResumeFile(e.target.files[0])} 
                    />
                </div>
                <div className = "form-group">
                    <label >Job Description</label>
                    <textarea row = "6" placeholder='Paste job descrription here'
                        value = {jobDescription}
                        onChange={(e)=>setJobDescrription(e.target.value)}
                    />
                </div>
                <button className = "submit-btn" onClick={handleSubmit} disabled= {loading}>
                    {loading ? "Generating..." : "Get Questions"}
                </button>
                {error && <p className='error'>{error}</p> }

                {success && (
                    <p className = "success">Questions are being generated. Please check the Sessions page.</p>
                )}

            </div>
        </div>
    )
}

export default Prepare ; 