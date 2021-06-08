import React, { useEffect, useState } from 'react'; 
import Unauthorized from './subcomponents/Unauthorized';
import User from './subcomponents/User';

export default function Account(){
    const [userEmail, setUserEmail] = useState("");
    const [token, setUserToken] = useState("");
    const [forbidden, setForbidden] = useState(false);

    useEffect(()=>{
        if (localStorage.getItem("user") && localStorage.getItem("token")){
            setUserEmail(localStorage.getItem("user"));
            setUserToken(localStorage.getItem("token"));  
            setForbidden(false);   
        } 
        else {
           setForbidden(true); 
        }
    },[setForbidden, setUserEmail, setUserToken]);

    return <div className="container-for-account">
        {
            !forbidden ? <User userEmail={userEmail} /> : 
            <Unauthorized />
        }

    </div>
}; 