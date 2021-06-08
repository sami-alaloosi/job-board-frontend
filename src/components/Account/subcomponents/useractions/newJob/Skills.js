import React, { useState } from 'react';


export default function Skills({allSkills, skillHandler, label}){
    const [skillsList, setskillsList] = useState(allSkills);
    const [customSkill, setCustomSkill] = useState(""); 
    const [customSkillMode, setCustomSkillMode] = useState(false); 
    const [show, setShow] = useState(false);


    return (
        <>
        <label 
        style={{cursor: "pointer"}} onClick={()=>setShow(!show)} className="label">{label}  {" "}
        <i className={!show ? "fas fa-angle-down" : "fas fa-angle-up"} aria-hidden="true"></i>
        </label>

        {
            show ?  <div className="field is-grouped is-grouped-multiline">
            {
                skillsList.map(({selected, name}) =>{
                    return <p className="control" key={name}>
                        <button className={!selected ? "button" : "button is-success"} id={name} onClick={(e)=>{
                            const i = skillsList.findIndex(({name})=> name === e.target.id);
                            const newskillsList = [...skillsList];
                            newskillsList[i] = {selected: !newskillsList[i].selected, name: newskillsList[i].name}
                            setskillsList(newskillsList);
                           skillHandler(newskillsList);
                        }}>
                            {name}
                        </button>
                    </p>
                })
            }
            <p className="control">
            <button className="button is-link is-light" onClick={()=> setCustomSkillMode(true)}>
                Add Custom Skill
            </button>
            </p>
        </div> : null 
        }
       
        {
            customSkillMode ?
            <div className="field is-grouped is-grouped-centered is-horizontal">
            <div className="control">
            <input className="input" placeholder="Add Skill" onChange={(e)=>{
                setCustomSkill(e.target.value); 
            }}/>
            </div>
            <div className="control">
            <button className="button is-success is-light" onClick={()=>{
                const newskillsList = [...skillsList];
                if (!newskillsList.filter(({name}) => customSkill === name).length && customSkill.length >= 1){
                    newskillsList.push({name: customSkill, selected: true});
                    setskillsList(newskillsList);      
                    skillHandler(newskillsList);
                }
            }}>submit</button>
            </div>
            <div className="control">
                <button className="button is-danger is-light" onClick={()=>{setCustomSkillMode(false)}}>
                Cancel
                </button>
            </div>
            </div> 
             :
             null
        }
       
        </>
    );
}; 


