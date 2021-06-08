import React, {useState, useEffect} from 'react';
import Skills from './resumeHelpers/Skills';
import Certs from './resumeHelpers/Certs';
import Edu from './resumeHelpers/Edu';
import WorkExp from './resumeHelpers/WorkExp';
import baseURL from '../../../../Server';
import {useToggle} from './resumeHelpers/useToggle';


/*
   `skills: {type: Array}, 
    education: {type: Array},
    experience: {type: Array}, 
    certifications: {type : Array},
    summary: {type: String, default: ""}
*/

export default function Resume(){
    const [activeSkills, activeEdu, activeCerts, activeWEXP, toggleHandler] = useToggle();

    const [skills, setSkills] = useState([]);
    const [certs, setCerts] = useState([]);
    const [edu, setEdu] = useState([]);
    const [wxp, setWxp] = useState([]);
    const [summary, setSummary] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false); 

    useEffect(()=>{
        (async ()=>{
            const { data: {resume} } = await baseURL.get(`/user/${localStorage.getItem("userId")}`)
            console.log(resume)
            setSkills(resume.skills);
            setCerts(resume.certifications);
            setEdu(resume.education);
            setWxp(resume.experience);
            setSummary(resume.summary);
        })()
     }, []);

     const updateResume = async () => {
         try{
            const response = await baseURL.patch("/app/resume", {
                skills,
                certifications : certs,
                education : edu,
                experience: wxp,
                id: localStorage.getItem("userId")
             });
             if (response.status === 200){
                 setIsSuccess(true);
                setTimeout(()=>{
                    setIsSuccess(false);
                }, 3000)
             } 
         } catch(err){
            console.log(err.response); 
            setIsError(true);
            setTimeout(()=>{
                setIsError(false);
            }, 6000)
         }
        
     } 

    return (
    <div className="container">
      { isSuccess &&  <div className="notification is-success has-text-centered">Your change was successfully proccessed!</div>}
      { isError &&  <div className="notification is-danger has-text-centered">Something went wrong while proccessing your request please retry!</div>}
        <div className="columns">
            <div className="column">
                    <div className="box">
                        <div id="skills" onClick={(e)=>toggleHandler(e)} className="is-flex is-justify-content-space-between is-clickable is-align-items-center">
                            <p id="skills" className="has-text-weight-bold is-size-4">Skills</p>
                            {activeSkills ?  <i id="skills" className="fas fa-arrow-up"></i> :
                              <i id="skills" className="fas fa-arrow-down"></i>}
                        </div> 
                        {activeSkills ? <Skills updateResume={updateResume} skills={[skills, setSkills]}/> : null}
                    </div>
                </div>

                <div className="column">
                    <div className="box">
                        <div id="edu" onClick={(e)=>toggleHandler(e)} className="is-flex is-justify-content-space-between is-clickable is-align-items-center">
                            <p id="edu" className="has-text-weight-bold is-size-4">Education</p>
                            {activeEdu ?  <i id="edu" className="fas fa-arrow-up"></i> :  <i id="edu" className="fas fa-arrow-down"></i>}
                        </div> 
                        {activeEdu ? <Edu updateResume={updateResume} education={[edu, setEdu]}/> : null}
                    </div>
                </div>
            
        </div>


        <div className="columns">
            <div className="column">
                    <div className="box">
                        <div id="certs" onClick={(e)=>toggleHandler(e)} className="is-flex is-justify-content-space-between is-clickable is-align-items-center">
                            <p id="certs" className="has-text-weight-bold is-size-4">Certifications</p>
                            {activeCerts?  <i id="certs" className="fas fa-arrow-up"></i> :  <i id="certs" className="fas fa-arrow-down"></i>}
                        </div> 
                        {activeCerts ? <Certs  updateResume={updateResume} certifications={[certs, setCerts]}/> : null}
                    </div>
                </div>

                <div className="column">
                    <div className="box">
                        <div id="wexp" onClick={(e)=>toggleHandler(e)} className="is-flex is-justify-content-space-between is-clickable is-align-items-center">
                            <p id="wexp" className="has-text-weight-bold is-size-4">Work Experience</p>
                            {activeWEXP ?  <i id="wexp" className="fas fa-arrow-up"></i> :  <i id="wexp" className="fas fa-arrow-down"></i>}
                        </div> 
                        {activeWEXP ? <WorkExp  updateResume={updateResume} experience={[wxp, setWxp]}/> : null}
                    </div>
                </div>

        </div>

    </div>
       
    )
}; 

