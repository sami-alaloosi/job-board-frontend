import React,{useState, useEffect} from 'react'; 
import SearchFields from './subcomponents/SearchFields';
import ResultJob from './subcomponents/ResultJob';
import JobDetails from './subcomponents/JobDetails';
import baseURL from '../../Server';
import Pagination from './subcomponents/Pagination'; 


export default function Jobs({user}){
    const [jobs, setJobs] = useState([]);
    const [jobDetailsId, setJobDetailsId] = useState("");
    const [page, setPage] = useState(1); 
    const [lastPage, setLastPage] = useState(10); 

    const [awaitingServer, setAwaitingServer] = useState(false); 

    const jobDetailClickHandler = (id) => {
        setJobDetailsId(id); 
        setTimeout(() => {
            document.getElementById("start-of-job-detail").scrollIntoView();    
        }, 250);
    }; 

    useEffect(()=>{
        (async function(){
            try{
             setAwaitingServer(true);
             const response = await baseURL.get(`/jobs?page=${page}&limit=5`);
             setAwaitingServer(false); 
             if (response.status === 200) {
                 setJobs(response.data.jobs);
                 setLastPage(response.data.pages[1]);
                
            };
            } catch(err){
                
            }
        })()
    }, [page]);

   

    return (
    <div>
       <SearchFields />
        <div><hr></hr></div>

        <div className={jobDetailsId.length > 0 ? "container-for-jobs" : "container-for-jobs-altr"}>
            <div className="container-job-results">

                {
                    awaitingServer ? <div>
                        <div className="title is-5 has-text-centered">Waiting for Slow Heroku Server...</div>
                    <progress class="progress is-danger" max="100">30%</progress>
                    </div> 
                    : null
                }

                {jobs.map((job)=>{
                    return <ResultJob key={job._id} 
                    companyName={job.companyName} salaryRange={job.salaryRange}
                    jobTitle={job.jobTitle} requiredSkills={job.requiredSkills} 
                    jobId={job._id} jobResponsibility={job.jobResponsibility} 
                    jobDetailClickHandler={jobDetailClickHandler}/>; 
                })}
                {
                    jobs.length ? <Pagination page={page} lastPage={lastPage} 
                    changePage={(pageNum)=>{setPage(pageNum)}}/>  : null
                }

            </div>
                
            
        
              {jobDetailsId.length >= 1 ?
               <div className="container-single-job" >
                <JobDetails jobId={jobDetailsId} cancelDetails={()=>{setJobDetailsId("")}} user={user}/></div> :
               <div className="container-single-job" style={{display:"none"}}></div> }  
          
               
        </div>
    </div>
)};