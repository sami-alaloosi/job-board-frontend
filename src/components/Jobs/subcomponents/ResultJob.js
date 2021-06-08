import React from 'react'; 
import displaySalary from './helpers/displaySalary';

export default function ResultJob({ companyName, salaryRange ,jobTitle, 
    requiredSkills, jobId, jobResponsibility, jobDetailClickHandler}){
    /* ________________________________ */
    
    return (
        <div className="box single-job-in-results" onClick={()=>{jobDetailClickHandler(jobId)}}>
            <h2 className="title is-5 is-capitalized job-search-title">{jobTitle}</h2>
            <h3 className="subtitle is-7 job-search-title is-capitalized has-text-weight-medium is-family-secondary job-search-subtitle">
            {companyName}  <i className="far fa-building"></i>
            </h3>
            <h3 className="title is-7 has-text-weight-bold is-family-monospace">{displaySalary(salaryRange)}</h3>
            <ul className="subtitle is-7 list-responsibilities">
                
                <li>{jobResponsibility[0]}</li>
                <li>{jobResponsibility[1]}</li>
            </ul>

            <div className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li> <span className="icon is-small"><i className="fab fa-html5"></i></span>HTML</li>
                    <li> <span className="icon is-small"><i className="fab fa-css3"></i></span>CSS</li>
                    <li> <span className="icon is-small"><i className="fab fa-js-square"></i></span> Javascript</li>
                </ul>
            </div>

        </div>
    );
}; 