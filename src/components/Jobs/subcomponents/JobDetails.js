import React,{useEffect, useState} from 'react';
import displaySalary from '../subcomponents/helpers/displaySalary';
import baseURL from '../../../Server';

export default function JobDetails(props){
    const {jobId, cancelDetails} = props; 
    const [job, setJob] = useState({});
    const [hasApplied, setHasApplied] = useState(false); 
    
    useEffect(()=>{
       if (jobId.length){
       baseURL.get(`/jobs/${jobId}`)
       .then(res => {
           const responseData = res.data; 
            setJob(responseData); 
       })
       .catch(err=>{
           console.error(err); 
       });

       if (localStorage.getItem("userDetails") !== null){
        const {appliedJobs} = JSON.parse(localStorage.getItem("userDetails"));
        const hasAppliedToThisJob = appliedJobs.filter(job => job.id === jobId);
        if (hasAppliedToThisJob.length !== 0){
            setHasApplied(true); 
        } else {
            setHasApplied(false); 
        }
       }
    }   
    }, [jobId, props.user, hasApplied]);
    
    const applyToJob = async () =>{
        try {
           const response = await baseURL.patch(`/app/${jobId}`, {
                "applicantId" : localStorage.getItem("userId")
            });
            if (response.status === 200){
                const {appliedJobs, resume} = JSON.parse(localStorage.getItem("userDetails"));
                appliedJobs.push({title: jobTitle, id: jobId}); 
                localStorage.setItem("userDetails",JSON.stringify({appliedJobs, resume})); 
                setHasApplied(true);
            }
        } 
        catch(err){
            console.error(err); 
        }
    }; 

    const applyHandler = () => {
        const message = `Looks Like your resume is empty or lacks enough information, to increase your success please provide more information in the account section. If you want to apply anyways press Ok, otherwise Cancel & go fill out your account details.`;

        const {resume} = JSON.parse(localStorage.getItem("userDetails"));
        // if resume has no skills no experience and no education then its considered empty otherwise
        if (!resume.skills.length){
            if(window.confirm(message)) applyToJob(); 
        } else {
            applyToJob(); 
        }
    }; 

    const withdrawHandler = async () => {
        try {
            // userId
            const response = await baseURL.put(`/app/${jobId}`, {
                "userId": localStorage.getItem("userId")
            });
            if (response.status === 201){
                const {appliedJobs, resume} = JSON.parse(localStorage.getItem("userDetails"));
                const newjobs = appliedJobs.filter(job=> job.id !== jobId);
                localStorage.setItem("userDetails", JSON.stringify({appliedJobs: newjobs, resume}));
                setHasApplied(false); 
            }
        } 
        catch(err){
            console.log(err); 
        }
    }; 

    const { companyName,createdAt,jobDescription,jobResponsibility,
            jobTitle,preferredSkills,requiredSkills,salaryRange,applicants} = job;
    const date = new Date(createdAt && createdAt);
    
    const cancelHandler = () => {
        cancelDetails();
        document.getElementById("search-field").scrollIntoView();
    }; 

    return <div id="start-of-job-detail">
        <div className="container content mt-3 ml-3 mr-3">

        <div style={{display:"flex", justifyContent:"space-between"}}>
             <h1>{jobTitle}</h1>
             <span className="icon is-small">
             <i className="fas fa-times is-clickable" onClick={cancelHandler}></i>
             </span>
            
        </div>

        <p>{companyName}</p>
        <h4>{salaryRange && displaySalary(salaryRange)}</h4>
        <h5>Job Summary:</h5>
        <p>{jobDescription}</p>
        <h5>Responsiblitties:</h5>
        <ul>
            {jobResponsibility && jobResponsibility.map(res=> <li key={res}>{res}</li>)}
        </ul>
        <h5>Required Skills:</h5>
        <ul>
            {requiredSkills && requiredSkills.map(skill=> <li key={skill}>{skill}</li>)}
        </ul>
        <h5>Prefered Skills:</h5>
            <ul>
                {preferredSkills && preferredSkills.map(skill => <li key={skill}>{skill}</li>)}
            </ul>

            {
                hasApplied === true ? <div className="field is-grouped is-grouped-centered"> 
                {props.user.length ? <button className="button is-danger" onClick={withdrawHandler}>Withdraw Application</button> : 
                <button title="yoo" disabled className="button is-link">Quick Apply</button>}
                <button className="button" style={{marginLeft:"10px"}}onClick={cancelHandler}>Close</button>
             </div> :
                <div className="field is-grouped is-grouped-centered"> 
                {props.user.length ? <button className="button is-link" onClick={()=>{applyHandler()}}>Quick Apply</button> : 
                <button title="yoo" disabled className="button is-link">Quick Apply</button>}
                <button className="button" style={{marginLeft:"10px"}}onClick={cancelHandler}>Close</button>
             </div>
            }


           {!props.user.length && <small className="has-text-danger">Please Login to Apply!</small> }

        <footer id="ftr" style={{display:"flex", flexDirection:"row", justifyContent:"space-between", paddingTop:"0.5%", marginBottom:"0"}}>
            <small>{applicants && applicants.length} <i className="fas fa-user-plus"></i></small>
            <small>Listing Date: {date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate()}</small>
        </footer>
        <hr></hr>
        </div>
    </div>
};
