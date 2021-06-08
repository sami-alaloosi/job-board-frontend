import React from 'react'; 


export default function Tabs({catalog, catalogActiveHandler}){

    
    return <div className="tabs is-centered">
        <ul>
            {
                Object.keys(catalog).map((name) => {
                    return <li key={name} className={catalog[name] === true? "is-active" : ""}><a onClick={()=>{catalogActiveHandler(name, catalog[name])}}>{name}</a></li>
                })
            }
            
        </ul>
    </div>;
}