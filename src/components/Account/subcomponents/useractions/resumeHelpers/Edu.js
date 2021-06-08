import React, { useState } from 'react';
import EmptyWarn from './sub/EmptyWarn';
import DatePicker from 'react-date-picker'; 
import {nanoid} from 'nanoid';

export default function Edu({education, updateResume}){
    const defaultSelect = "Education Type";
    const [eduList, setEduList] = education;
   
    // mode state 
    const [addMode, setAddMode] = useState(false); 
    

    // inputs state 
    const [schoolAttended, setSchoolAttended] = useState("");
    const [eduTypes] = useState([defaultSelect,"Bootcamp", "Self-Taught", "Associate", "Bachelor", "Master", "PHD", "Trade-School"]);
    const [selectedEduType, setSelectedEduType] = useState(defaultSelect);
    const [startDate, setStartDate] = useState(null); 
    const [currentlyAttending, setCurrentlyAttending] = useState(true); 
    const [endDate, setEndDate] = useState(null);

    const removeEducation = (identifier) => {
        console.log(identifier);
        const newEduList = [...eduList].filter(({id}) => id !== identifier);
        setEduList(newEduList);
    };

    const dateFormatter = (date) =>{
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    };

    const renderEducation = () => {
        return eduList.map(({school, educationType, startDate, endDate, id})=> {
            return <div className="box" key={id}>

                <div className="is-flex is-flex-direction-row-reverse"><div><span className="icon is-small"><i id={id} 
                onClick={()=>removeEducation(id)} className="far fa-trash-alt is-clickable"></i></span></div></div>

                <p> <strong>School Name: </strong> {school}</p>
                <p> <strong>Education Type: </strong>{educationType}</p>
                <p><strong>Start Date: </strong>{startDate}</p>
               {endDate ? <p><strong>End Date: </strong>{endDate}</p> : null}
            </div>
        }); 
    };
    const addHandler = () =>{
        if (schoolAttended.length >= 2 && startDate && selectedEduType !== defaultSelect && (endDate || currentlyAttending)){
            const newEdu = {
                id: nanoid(),
                school: schoolAttended,
                educationType: selectedEduType,
                startDate: dateFormatter(startDate),
                endDate: endDate ? dateFormatter(endDate) : null,
            };
            const newEduList = [...eduList];
            newEduList.push(newEdu);
            setEduList(newEduList);
            setSchoolAttended("");
            setSelectedEduType(defaultSelect);
            setStartDate(null);
            setEndDate(null);
            setAddMode(!addMode);
            
        };
    };

    return <div className="container">
        <div>
            {
                eduList.length ? <> {renderEducation()}  </>
                : <EmptyWarn>
                     Your Education section is Empty please fill it up to improve your resume!
                 </EmptyWarn>
            }
        </div>
        
        {
            addMode ?
            (
                <div>
                    <hr/>
                <div className="field mt-4 is-horizontal">
                    <div className="field-label is-normal">
                    <label className="label">Your School:</label>
                    </div>
        
                    <div className="field-body">
                        <div className="field">
                             <p className="control is-expanded has-icons-left">
                                <input className="input" placeholder="Add School" value={schoolAttended} onChange={(e)=>setSchoolAttended(e.target.value)}/>
                                <span className="icon is-small is-left"><i className="fas fa-school" /></span>
                            </p>
                        </div>
        
                    <div className="field">
                            <div className="control has-icons-left">
                                <div className="select is-full-width">
                                <select value={selectedEduType} onChange={(e)=>{
                                    setSelectedEduType(e.target.value)
                                }}>
                                  {
                                      eduTypes.map((t)=> <option key={t} value={t}>{t}</option>)
                                  }
                                </select>
                                <span className="icon is-small is-left"><i className="fas fa-user-graduate"/></span>
                                </div>     
                            </div>
                    </div>
                    </div>
                </div>
              
                <div className="field">
                    <div className="control">
                        <label className="label">Start Date:</label>
                        <DatePicker className="input" value={startDate} onChange={setStartDate}/>
                    </div>
        
                    <div className="control mt-3" onChange={(e)=>setCurrentlyAttending(e.target.value === "1")}>
                        <label className="label">Currently Attending:</label>
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
                        !currentlyAttending ?  <div className="control mt-2">
                        <label className="label">End Date:</label>
                            <DatePicker value={endDate} onChange={setEndDate} className="input"/>
                        </div> : null
                    }
                    </div>
                    </div> 
            )
            : null 
            
        }
        {
            schoolAttended && selectedEduType !== defaultSelect && startDate && (currentlyAttending || endDate) ?
             <div className="field mt-3">
                 <div className="control">
                     <button className="button is-link is-light" onClick={addHandler}>Add</button>
                </div>
             </div> : null 
        }

            <hr />
            <div className="field is-grouped is-grouped-centered">
                <div className="control">
                    <button className="button is-link" onClick={updateResume}>Save Education</button>
                </div>
                <div className="control">
                    <button className="button" onClick={()=>setAddMode(!addMode)}> {addMode ? "Close Editor" : "Edit Education"}</button>
                </div>
            </div>
    </div>
}