import React, { useEffect, useState } from 'react'; 
import baseURL from '../../../../../Server';



export default function ViewPostings(){
    
    const [jobs, setJobs] = useState([]); 
    const [viewApplicantsMode, setViewApplicantsMode] = useState(false); 
    const [applicants, setApplicants] = useState([]);

    useEffect(()=>{
        (async ()=>{
          const response = await baseURL.get(`/jobs/recruiter/${localStorage.getItem("user")}`,{
               body:{
                    createdBy: localStorage.getItem("user")
                }
            });
            if (response.status === 200){
                setJobs(response.data.jobs);
            }

        })()
    }, [])
    console.log(applicants); 

    const deleteHandler = async (id) => {
       const res = await baseURL.delete(`/jobs/${id}`);
       if (res.status === 201){
            const newJobs = [...jobs]; 
            setJobs(newJobs.filter(j => j._id !== id));
       }; 
    }; 

    const renderJobs = () => {
        return jobs.map((job) => {
            return <div className="box">
                <h1 className="title">{job.jobTitle}</h1>
                <h2 className="subtitle">{job.companyName}</h2>
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-danger is-light" onClick={()=>{
                            deleteHandler(job._id);
                        }}>Delete</button>
                    </div>
                    <div className="control">
                    <button className="button is-link is-light" onClick={()=>{
                        const apicnts = jobs.filter((j)=> j._id === job._id).map(j=> j.applicants);
                        setApplicants(...apicnts);
                        setViewApplicantsMode(true); 
                    }}
                    >View Applicants</button>
                    </div>
                </div>
            </div>
        })
    };

    const renderIsEmpty = () => {
        return <div className="notification has-text-centered">
            Looks like you have not created Any Job Postings, create one and come back to track and manage your job applications & applicants
        </div>
    }; 

    return (
        <>
        <div className={viewApplicantsMode ? "modal is-active" : "modal"}>
        <div className="modal-background"></div>
        <div className="modal-content">
            <div className="box">
                <h2 className="title is-3 has-text-centered">Applicants</h2>
                {
                    applicants.length ? 
                        applicants.map((aplicant) => {
                            return <div className="box">
                                <label className="label">Name:</label>
                                <p>{aplicant.fullname}</p>
                                <label className="label">Email:</label>
                                <p>{aplicant.applicantEmail}</p>
                                <label className="label">Skills:</label>
                                <ul>
                                    {aplicant.skills.map(s=> <li key={s}>{s}</li>)}
                                </ul>
                                </div>
                        
                        })
                    : <div className="notification has-text-centered">you have no applicants</div>
                }
            </div>
        </div>
        <button class="modal-close is-large" aria-label="close" onClick={()=>{setViewApplicantsMode(false)}}></button>
        </div> 
    
       
        {jobs.length ? renderJobs() : renderIsEmpty()}

        </>
    )
};