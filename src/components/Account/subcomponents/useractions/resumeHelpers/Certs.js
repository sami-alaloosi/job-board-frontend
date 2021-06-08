import React, { useState } from 'react';
import EmptyWarn from './sub/EmptyWarn';
import DatePicker from 'react-date-picker'; 

export default function Certs({certifications,updateResume}){
    const [certs, setCerts] = certifications; 

    const [addMode, setAddMode] = useState(false); 
    const [certsInput, setCertsInput] = useState("");
    const [dateRecieved, setDateRecieved] = useState(null); 
    const dateFormatter = (date) =>{
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    };
    const addCerts = () => {
        if (certs.map(({name})=> name).includes(certsInput)) return; 
        const newCert = {
            name: certsInput, 
            dateRecieved: dateFormatter(dateRecieved)
        };
        const newCerts = [...certs];
        newCerts.push(newCert);
        setCerts(newCerts);
        setDateRecieved(null);
        setCertsInput("");
        setAddMode(!addMode);
    }; 

    const removeCerts = (n) => {
        const nc = certs.filter(({name}) => name !== n);
        setCerts(nc);

    }; 

    const rendercerts = () =>{
        return certs.map(({name, dateRecieved}) => {
            return <div className="box" key={name} id={name}>
                 <div className="is-flex is-flex-direction-row-reverse"><div><span className="icon is-small"><i id={name} 
                onClick={()=>removeCerts(name)} className="far fa-trash-alt is-clickable"></i></span></div></div>
                <p><strong>Name: </strong>{name}</p>
                <p><strong>Date Recieved: </strong>{dateRecieved}</p>
            </div>
        })
    }; 

    return <div className="container">
        <div>
        {
            certs.length ?<> {rendercerts()} <hr/></> : <EmptyWarn>Your certifications section is empty, add some to impove resume!</EmptyWarn>
        }
        </div>
       
       {
           addMode ? (
               <>
            <div className="field mt-3">
                    <label className="label">Certification Name: </label>
                    <div classNam="control">
                        <input placeholder="enter certification" className="input" value={certsInput} onChange={(e)=>setCertsInput(e.target.value)}/>
                    </div>
                    </div>
                <div className="field">
                <label className="label">Date Recieved: </label>
                <div className="control">
                        <DatePicker value={dateRecieved} onChange={setDateRecieved} className="input"/>
                    </div>
                </div>
        </>
           ) : null
       }

       {
           certsInput.length > 3 && dateRecieved ? (
            <div className="control">
            <button className="button is-link is-light" onClick={addCerts}>
                Add
            </button>
            </div>
           ) : null
       }

        
   

        <hr />

        <div className="field is-grouped is-grouped-centered">
            <div className="control">
                <button className="button is-link" onClick={updateResume}>Save Certifications</button>
            </div>
            <div className="control">
                <button className="button" onClick={()=>setAddMode(!addMode)}>{addMode ? "Close Editor" : "Edit Certifications" }</button>
            </div>
        </div> 
       
    </div>
}