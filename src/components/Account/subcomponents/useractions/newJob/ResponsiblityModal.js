import React, { useState } from 'react';
import PreMadeRes from './preMadeJobRes'; 

export default function ResponsibilityModal({allRessponsibilities ,ackRes}){
    const [pmResps, setPmResps] = useState(allRessponsibilities);
    const [preMadeMode, setPreMadeMode] = useState(false);
    const [controllerModal, setControllerModal] = useState(false); 
    const [responsiblities, setResponsibilites] = useState([]);

    const [customField, setCustomField] = useState(""); 
    
    return <div>
        <button className="button is-rounded is-link" onClick={()=>setControllerModal(true)}>Add Job Responsibilities</button>
        <div className={controllerModal ? "modal is-active" : "modal"}>
        <div className="modal-background"></div>
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">Job Responsibilities</p>
                <button onClick={()=>setControllerModal(false)} className="delete"></button>
            </header>

           <section className="modal-card-body"> 

               <div className="notification is-link is-light has-text-centered"> 
               For your convenience checkout our <u style={{cursor:"pointer"}} 
                onClick={()=>{
                    setControllerModal(false); 
                    setPreMadeMode(true);
                }}
               >pre-made Templates</u> 
               </div>

               <div className="box">
                    <div className="field">
                            <div className="control">
                                 <textarea className="textarea is-link has-fixed-size" placeholder="Add Responsibility" 
                                 value={customField} onChange={(e)=> setCustomField(e.target.value)}/>
                             </div>
                    </div>
                    <div className="field is-grouped is-grouped-centered">
                            <div>
                                <button className="button is-link is-light" onClick={()=>{
                                    if (customField.length > 2 && !responsiblities.includes(customField)) {
                                        const newRes = [...responsiblities];
                                        newRes.push(customField);
                                        setResponsibilites(newRes);
                                        ackRes(newRes);
                                        setCustomField("");
                                    }
                                }}>Add One</button>
                            </div>
                    </div>
               </div>

               {responsiblities.length ? <div className="box">
                <div className="content">
                    <h5 className="has-text-centered">Job Responsibilities</h5>
                <ul>
                  {
                      responsiblities.map(res => <li key={res}>{res} <i id={res} onClick={(e)=>{
                        const newRes = [...responsiblities].filter(res => res !== e.target.id);
                        setResponsibilites(newRes);
                        ackRes(newRes);
                        const preMadeResps = allRessponsibilities.map(({value})=> value);
                        const id = e.target.id; 
                        if (preMadeResps.includes(id)){
                            console.log("called")
                            const newPm = [...pmResps];
                            const i = pmResps.findIndex(({value})=> value === id);
                            console.log(i);
                            newPm[i] = {value: pmResps[i].value, selected: false}
                            console.log(pmResps);
                            setPmResps(newPm);
                        }            
            
                      }} className="far fa-times-circle is-clickable chc" ></i> </li>)
                  }
                </ul>
                </div>
               </div> : null}
            </section>
            
            <footer className="modal-card-foot">
                <div className="field is-grouped">
                
                  <div className="control">
                  <button className="button is-link" onClick={()=>{setControllerModal(!controllerModal)}}>Confirm</button>
                  </div>
                </div>
            </footer>   
               
        </div>

        </div>

          <PreMadeRes 
           allRessponsibilities={allRessponsibilities} 
           preMadeResponsibilites={pmResps}
           setpreMadeResponsibilites={setPmResps}
           active={preMadeMode} goBack={setControllerModal} 
           setActive={setPreMadeMode} getResps={(resps)=>{
            const formattedResps = resps.filter(({selected})=> selected).map(({value})=> value);
            const newResps = [...responsiblities];
            
            formattedResps.forEach((resp)=> {
                if (!newResps.includes(resp)){
                    newResps.push(resp);
                }
            });
            const preMadeResps = allRessponsibilities.map(({value})=> value);
            setResponsibilites(newResps.filter((resp)=>{
                if (preMadeResps.includes(resp) && !formattedResps.includes(resp)){
                } else {
                    return resp
                };
           
            }));
            ackRes(newResps.filter((resp)=>{
                if (preMadeResps.includes(resp) && !formattedResps.includes(resp)){
                } else {
                    return resp
                };
           
            }));
           }}/>
    </div>;
}; 


