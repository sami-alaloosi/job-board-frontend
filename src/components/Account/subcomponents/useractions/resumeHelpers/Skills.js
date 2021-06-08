import React, { useState } from 'react';
import EmptyWarn from './sub/EmptyWarn';

export default function Skills({skills, updateResume}){
    const [userSkills, setUserSkills] = skills; 
    const [skillInput, setSkillInput] = useState("");
    const [addMode, setAddMode] = useState(false); 

    const removeSkill = (skill) =>{
        const newUserSkills = [...userSkills].filter((s) => s !== skill); 
        setUserSkills(newUserSkills);
    };

    const renderSkills = () =>{
        return userSkills.map((skill) => <li key={skill}> {skill} <i id={skill} onClick={(e)=>{removeSkill(e.target.id)}} className="far fa-trash-alt is-clickable"></i></li>)
    }
    return <div className="container">
            <div>
                {
                    userSkills.length ? 
                    <div className="content">
                        <ul>
                            {renderSkills()}
                        </ul>
                    </div>
                     : <EmptyWarn>Your Skills Section is empty please fill it up to improve your resume!</EmptyWarn>
                }
            </div>

            {  addMode ?
                <>
                <label className="label mt-3">Add Skill:</label>
                <div className="field has-addons">
                
                <div className="control is-expanded">
                    <input className="input" placeholder="Add Skill" value={skillInput} onChange={(e)=> setSkillInput(e.target.value)}/>
                </div>
                <div className="control">
                    <button className="button" onClick={()=>{
                        if (skillInput.length > 1 && !userSkills.includes(skillInput)){
                            const newUserSkills = [...userSkills];
                            newUserSkills.push(skillInput);
                            setUserSkills(newUserSkills);
                            setSkillInput("");
                        }
                    }}>
                        Add
                     </button>
                    </div>
                </div>
            </> : null
            }

            <hr />
            <div className="field is-grouped is-grouped-centered">
                <div className="control">
                    <button className="button is-link" onClick={updateResume}>Save Skills</button>
                </div>
                <div className="control">
                    <button className="button" onClick={()=> {setAddMode(!addMode);setSkillInput("")}}> {addMode ? "Cancel Changes" : "Edit Skills" }</button>
                </div>
            </div>
       </div>
    
}