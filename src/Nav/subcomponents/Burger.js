import React from 'react'; 
import {useHistory} from 'react-router-dom';

export default function Burger(){
    const history = useHistory();
    const isActiveToggler = () => {
        const menuBurger = document.getElementById("mobile-menu-burger");
        const menuMobile = document.getElementById("mobile-menu"); 
        menuBurger.classList.toggle("is-active");
        menuMobile.classList.toggle("is-active");
    };

    return   <div className="navbar-brand">
    <span className="navbar-item">   
    <h1 className="has-text-black title is-3 is-family-monospace is-clickable" onClick={()=>history.push("/")}>Remoti<span className="has-text-link" >fy</span></h1>
    </span>
    <div role="button" id="mobile-menu-burger" className="navbar-burger" onClick={isActiveToggler}>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
    </div>
</div>
}; 