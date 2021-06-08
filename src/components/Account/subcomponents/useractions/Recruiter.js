import React, { useState } from 'react';
import Skills from './newJob/Skills';
import {allSkills} from './newJob/allskills';
import SalaryRange from './newJob/SalaryRange';
import {allRessponsibilities} from './newJob/allResponsibilities';
import ResponsibilityModal from './newJob/ResponsiblityModal';
import baseURL from '../../../../Server';
import {useHistory} from 'react-router-dom';
import ViewPostings from '../useractions/RecruiterViewJobs/ViewPostings';

export default function Recruiter(){
    const history = useHistory();
    const [salaryRange, setSalaryRange] = useState({yearly: true, range: ""}); 
    const [reqSkills, setReqSkills] = useState([]);
    const [prefSkills, setPrefSkills] = useState([]);

    const [title, setTitle] = useState("");
    const [companyName, setCompanyName] = useState(""); 
    const [summary, setSummary] = useState(""); 

    const [responsiblities, setResponsibilites] = useState([]);
    
    const [isCreatePost, setIsCreatePost] = useState(true);
 

    const submitHandler = async () => {
        if (salaryRange && title.length && companyName.length && summary.length && reqSkills.length && responsiblities.length){
            const rs = reqSkills.filter(({selected}) => selected === true).map(({name}) => name);
            const ps = prefSkills.filter(({selected}) => selected === true).map(({name}) => name);
            const newJob = {
                jobTitle: title,
                salaryRange: salaryRange.range,
                jobDescription: summary,
                requiredSkills: rs,
                preferredSkills: ps,
                companyName: companyName,
                jobResponsibility: responsiblities,
                email : localStorage.getItem("user")
            }; 
            const res = await baseURL.post("/jobs", newJob);
            if (res.status === 201){
                history.push("/jobs");
            }
        }
    };

    const cancelHandler = () => {
        setSalaryRange({yearly: true, range: ""});
        setReqSkills([]);
        setPrefSkills([]);
        setTitle("");
        setCompanyName("");
        setSummary("");
        setResponsibilites([]);
    }; 

    return (
        <section>
            <div className="container">
            <nav className="breadcrumb is-right">
                <ul>
                    <li className={isCreatePost && "is-active"}><a onClick={()=>setIsCreatePost(!isCreatePost)}>
                        Create Posting<span className="icon is-small"><i className="fas fa-plus-circle"></i></span></a> 
                    </li>
                    <li className={!isCreatePost && "is-active"}><a onClick={()=>setIsCreatePost(!isCreatePost)}>
                        View Postings <span className="icon is-small"><i className="fas fa-desktop"></i>
                    </span></a></li>
                </ul>
            </nav>

            {
                !isCreatePost ? <ViewPostings /> : 
                <>
                          <div className="field">
            <label className="label">Job Title</label>
            <div className="control">
                <input className="input" value={title} onChange={(e)=> setTitle(e.target.value)} placeholder="Enter Job Title..."></input>
            </div>
            </div>

            <div className="field">
            <label className="label">Company Name</label>
            <div className="control">
                <input className="input" value={companyName} onChange={(e)=>setCompanyName(e.target.value)} placeholder="Enter Company Name..."></input>
            </div>
            </div>

         
            
            <SalaryRange setSalaryRange={setSalaryRange}/>

            <Skills allSkills={allSkills} label="Required Skills" skillHandler={setReqSkills}/>
            {
                reqSkills.filter(({selected}) => selected === true).length >= 1 ? 
                <Skills allSkills={allSkills} label="Preffered Skills" skillHandler={setPrefSkills}/> : null
            }
            
            <ResponsibilityModal ackRes={setResponsibilites} allRessponsibilities={allRessponsibilities}/>

            <div className="field">
                <div className="control">
                <label className="label mt-3">Job Summary</label>
                <textarea value={summary} onChange={(e)=> setSummary(e.target.value)} 
                className="textarea is-link" placeholder="please enter a job summary describing the job and company (minimum 25 characters)">
                </textarea>
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <button className="button is-link" onClick={submitHandler}>Submit</button>
                </div>
                <div className="control">
                    <button className="button is-link is-light" onClick={cancelHandler}>Cancel</button>
                </div>
            </div>
                </>
            }

      

            </div>
        </section>
    )
}; 

