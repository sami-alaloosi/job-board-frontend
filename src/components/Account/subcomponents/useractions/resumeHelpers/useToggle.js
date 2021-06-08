import {useState} from 'react'; 

export function useToggle(){
    const [activeSkills, setActiveSkills] = useState(false);
    const [activeEdu, setActiveEdu] = useState(false);
    const [activeCerts, setActiveCerts] = useState(false);
    const [activeWEXP, setActiveWEXP] = useState(false);

    const toggleHandler = (e) =>{
        switch(e.target.id){
            case "skills":
                setActiveSkills(!activeSkills);
                break;
            case "edu":
                setActiveEdu(!activeEdu);
                break;
            case "certs":
                setActiveCerts(!activeCerts);
                break;
            default:
                setActiveWEXP(!activeWEXP);
                break;
        }
    }

    return [
        activeSkills, 
        activeEdu, 
        activeCerts,
        activeWEXP,
        toggleHandler
]

};