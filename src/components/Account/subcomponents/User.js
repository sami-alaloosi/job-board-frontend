import React, { useState } from 'react'; 
import Tabs from './Tabs';
import Account from "./useractions/Account";
import Recruiter from './useractions/Recruiter';
import Jobs from "./useractions/Jobs";
import Resume from "./useractions/Resume";


export default function User({userEmail}){ 
    const [catalog, setCatalog] = useState({
        Resume: true,
        Account: false,
        Jobs: false, 
        Recruiter: false,
    });

    const catalogActiveHandler = (n, active) => {
        // n is refereing to name of the click event 
        if (active === true) {
            return 
        } else {
            const newCatalog = {...catalog};
            for (let key in newCatalog){
                if (key === n){
                    newCatalog[key] = true;
                } else newCatalog[key] = false; 
            }
            setCatalog(newCatalog);
        }
    }; 

    const renderUserAction = () => {
        if (catalog.Account){
            return <Account />
        } else if (catalog.Resume){
            return <Resume />
        } else if(catalog.Jobs){
            return <Jobs />
        } else {
            return <Recruiter />
        }
    };
    
    return <div>
        <Tabs catalog={catalog} catalogActiveHandler={catalogActiveHandler}/>
        {
           renderUserAction()
        }
    </div>
}; 