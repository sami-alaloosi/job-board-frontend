import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Burger from './subcomponents/Burger'; 
import Register from './subcomponents/Register';
import Login from './subcomponents/Login'; 
import {useHistory} from 'react-router-dom';

export default function Nav({user, token, updateUser}){
    const [showRegister , setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false); 

    const history = useHistory();

    return <nav className="navbar has-background-white" >

      <Burger />

        <div id="mobile-menu" className="navbar-menu">
            <div className="navbar-start">

            <span className="navbar-item">
                <Link to="/" className="has-text-dark">Home</Link>
            </span>

            <span className="navbar-item">
                <Link to="/jobs" className="has-text-dark">Jobs</Link>
            </span>

            {
                user && user.length && token && token.length &&  <span className="navbar-item">
                <Link to="/account" className="has-text-dark">Account</Link>
                </span>
            }
           
          </div>

    <div className="navbar-end">
      <div className="navbar-item">
        {
                !user.length || !token.length ?  <div className="buttons">
                <span className="button is-link" onClick={()=> {setShowRegister(!showRegister)}}>
                  <strong>Sign up</strong>
                </span>
                <span className="button is-light" onClick={()=> {setShowLogin(!showLogin)}}>
                  Log in
                </span>
              </div> :
              // toggle make user sign out
              <div>
                  <span className="button" onClick={()=> {updateUser("out"); history.push("/")}}><strong>Sign Out</strong></span>
              </div>
        }
       
      </div>
    </div>
    </div>
        <Register showRegister={showRegister}
         closeModal={()=> {setShowRegister(!showRegister)}} 
         updateUser={updateUser}/>

        <Login showLogin={showLogin}
         closeModal={() => {setShowLogin(!showLogin)}} 
         updateUser={updateUser}/>
    </nav>;
};