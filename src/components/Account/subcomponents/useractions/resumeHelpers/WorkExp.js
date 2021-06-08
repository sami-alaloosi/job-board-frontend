import React, { useState } from 'react';
import EmptyWarn from './sub/EmptyWarn';
import DatePicker from 'react-date-picker'; 
import {nanoid} from 'nanoid';

export default function WorkEXP({experience, updateResume}){
    const [experienceList, setExperiencelist] = experience; 
    const [startdate, setStartdate] = useState(null);
    const [enddate, setEnddate] = useState(null);
    const [currEmployed, setCurrEmployed] = useState(true); 
    const [addMode, setAddMode] = useState(false); 

    // input states 
    const [position, setPosition] = useState("");
    const [companyName, setCompanyName] = useState("");

    const addHandler = () => {
        const newExp = {
            id: nanoid(),
            position: position,
            companyName: companyName,
            startDate: dateFormatter(startdate), 
            currentlyEmployed: currEmployed,
            endDate: enddate ? dateFormatter(enddate) : null 
        };
        const newExpList = [...experienceList]; 
        newExpList.push(newExp);
        setExperiencelist(newExpList);
        setPosition("");
        setCompanyName("");
        setStartdate(null);
        setEnddate(null); 
        setCurrEmployed(true);
        setAddMode(!addMode);
    }; 

    const deleteHandler = (identifier) => {
        const newEXps = [...experienceList].filter(({id})=> id !== identifier);
        setExperiencelist(newEXps);
    }; 

    const submitHandler = () => {

    }; 

    const renderExpList = () => {
        return experienceList.map(({position, companyName, startDate, currentlyEmployed, endDate, id})=> {
            return <div className="box" key={id}>
                <div className="is-flex is-flex-direction-row-reverse"><div><span className="icon is-small"><i id={id} 
                onClick={()=>deleteHandler(id)} className="far fa-trash-alt is-clickable"></i></span></div></div>
                <p><strong>Position: </strong>{position}</p>
                <p><strong>Company Name: </strong>{companyName}</p>
                <p><strong>Start Date: </strong>{startDate}</p>
                {
                    !currentlyEmployed && <o><strong>End Date: </strong>{endDate}</o>
                }

            </div>
        })
    };

    const dateFormatter = (date) =>{
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    };

    return <div className="container">
        <div>
            {
                experienceList.length ? <> {renderExpList()} </>: <EmptyWarn>Your experience section is empty fill with either work experience or Projects!</EmptyWarn>
            }
        </div>
            
            {addMode ? (
           <>
           <div className="field mt-3">
               <div className="control">
                <label className="label">Position:</label>
                   <input className="input" placeholder="Enter Your Title" value={position} onChange={(e)=> setPosition(e.target.value)}/>
               </div>
           </div>
           
           <div className="field">
               <label className="label">Company Name:</label>
               <div className="control">
                   <input className="input" placeholder="Enter company or project name" value={companyName} onChange={(e)=> setCompanyName(e.target.value)}/>
               </div>
           </div>
   
   
           <div className="field">
               <div className="control">
                   <label className="label">Start Date:</label>
                   <DatePicker value={startdate} onChange={setStartdate} className="input" />
               </div>
   
               <div className="control mt-3" onChange={(e) => setCurrEmployed(e.target.value === "1")}>
                   <label className="label">Currently Employed:</label>
                   <label className="radio">
                       <input type="radio" name="curr" defaultChecked value="1"/>
                       Yes
                   </label>
                   <label className="radio">
                       <input type="radio" name="curr" value="0"/>
                       No
                   </label>
               </div>
               
             {
                !currEmployed ?  <div className="control mt-2">
                <label className="label">End Date:</label>
                    <DatePicker value={enddate} onChange={setEnddate} className="input"/>
                </div> : null 
             }  
       
               </div>
               </>

            ) : null}

          
        {
            position.length > 3 && companyName.length > 3 && startdate && (currEmployed || enddate) ?
             <div className="field">
                 <div className="control">
                     <button className="button is-link is-light" onClick={addHandler}>Add</button>
                </div>
             </div> : null 
        } 

          <hr />
          <div className="field is-grouped is-grouped-centered">
                <div className="control">
                    <button className="button is-link" onClick={updateResume}>Save Skills</button>
                </div>
                <div className="control">
                    <button className="button" onClick={()=> {setAddMode(!addMode)}}> {addMode ? "Close Editor" : "Edit Experience" }</button>
                </div>
          </div>
    </div>
}


