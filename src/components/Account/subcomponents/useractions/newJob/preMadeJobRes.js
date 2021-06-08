import React, {useState} from 'react'; 


export default function PreMadeRes({allRessponsibilities,preMadeResponsibilites,setpreMadeResponsibilites, active, setActive, goBack, getResps}){
    const [searchTerm, setSearchTerm] = useState(""); 

    return <>
                <div className={active ? "modal is-active" : "modal"}>
                    <div className="modal-background"></div>
                    <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Job Responsibilities</p>
                        <button className="button" onClick={()=> {setActive(false); goBack(true);}} > <span className="icon is-small"><i className="fas fa-backspace"></i></span></button>
                    </header>

                    <section className="modal-card-body">

                    <div className="field">
                    <div className="control has-icons-left">

                    <input className="input" placeholder="Search pre-made responsibilites" value={searchTerm} onChange={(e)=>{
                        const searchVal = e.target.value;
                        const premadeRes = [...preMadeResponsibilites];
                        setSearchTerm(searchVal); 
                       const n = premadeRes.filter(({value})=> {
                           const v = value.toLowerCase();
                           return v.includes(searchTerm.toLowerCase())
                        });
                        setpreMadeResponsibilites(n);
                        if (searchTerm.length === 0 || searchVal.length === 0){
                            setpreMadeResponsibilites(allRessponsibilities);
                        };
                        

                    }}/>
                    <span className="icon is-small is-left"><i className="fas fa-search"></i></span>
                    </div>
                    </div>
                    

                    {
                        preMadeResponsibilites.map(({value, selected})=> {
                            return <div id={value} style={{cursor:"pointer"}}
                             className={selected ? "notification is-success" : "notification"} 
                             onClick={(e)=>{
                                const id = e.target.id; 
                                const newPremade = [...preMadeResponsibilites];
                                const i = preMadeResponsibilites.findIndex(({value}) => value ===id);
                                newPremade[i] = {value: preMadeResponsibilites[i].value, selected: !preMadeResponsibilites[i].selected}
                                getResps(newPremade);
                                setpreMadeResponsibilites(newPremade);
                             }}
                             key={value}>{value}</div>
                        })
                    }

                    </section>

                    </div>
                </div>

    </>
};
