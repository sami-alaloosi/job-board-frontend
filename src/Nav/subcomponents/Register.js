import React, { useEffect, useState } from 'react';
import Modal from '../../General/Modal';
import {validate} from 'email-validator'; 
import baseURL from '../../Server';
import AuthFieldContainer from './AuthStyle';


export default function Register({showRegister, closeModal, updateUser}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName , setFirstName] = useState("");
    const [lastName, setLastName] = useState(""); 
    const [emailExists, setEmailExists] = useState(false);
    const [serverError, setServerError] = useState(false);

    useEffect(()=>{
        if (showRegister === false){
            setEmail(""); setPassword(""); setConfirmPassword("");
            setFirstName(""); setLastName(""); setEmailExists(false); setServerError(false);
        }
    }, [showRegister])

    const changeHandler = (e) => {
        const location = e.target.id; 
        const value = e.target.value; 
        switch(location){
            case "email": 
            setEmail(value); 
                break; 
            case "password":
            setPassword(value);
                break;
            case "fn":
                setFirstName(value);
                break;
            case "ln":
                setLastName(value);  
                break; 
            default:
                setConfirmPassword(value);
                break;
        }
    }; 

    const submitHandler = async (e) => {
        try {
        e.preventDefault();
        if (validateInputs() === true){
           const res = await baseURL.post("/entry/register", {
                "firstName": firstName, 
                "lastName" : lastName, 
                "email" : email, 
                "password" : password
            });
            if (res.status === 200){
                console.log(res.data.user.appliedJobs);
                console.log(res.data.user.resume);
                updateUser("in", 
                {
                    user:res.data.user.email, 
                    token: res.data.token,
                    userId: res.data.user._id,
                    userDetails: {appliedJobs: res.data.user.appliedJobs, resume: res.data.user.resume}
                });
                setEmailExists(false);
                setServerError(false);
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setLastName("");
                setFirstName("");
                closeModal();
            }
        }
        } 
        catch (err){
            if (err.response.status === 403){
                setEmailExists(true); 
            } else {
                setServerError(true); 
            }
        }
    }; 

    const cancelHandler = (e) => {
        e.preventDefault();
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setLastName("");
        setFirstName("");
        closeModal(); 
    };

    const validateInputs = () => {
        if (firstName.length && lastName.length && validate(email) && password.length && password === confirmPassword){
            return true;
        } else {
            return false; 
        }
    }

    return <Modal modalClassName={showRegister ? "modal is-active" : "modal"} closeModal={closeModal}>
        <h1 className="title is-4 has-text-centered">Register</h1>

        <form id="form-register" style={AuthFieldContainer} onSubmit={submitHandler}>
            
        <label className="label">
            First Name
            <input className="input" type="text" placeholder="First Name" id="fn" onChange={changeHandler} value={firstName}/>
            </label>

            <label className="label">
            Last Name
            <input className="input" type="text" placeholder="Last Name" id="ln" onChange={changeHandler} value={lastName}/>
            </label>

            <label className="label">
            Email
            <input className="input" type="text" placeholder="Email" id="email" onChange={changeHandler} value={email}/>
            </label>
            

            <label className="label">
            Password
            <input className="input" type="password" placeholder="Password" id="password" onChange={changeHandler} value={password}/>
            </label>

            <label className="label">
            Confirm Password
            <input className="input" type="password" placeholder="Confirm Password" id="confirmPassword" onChange={changeHandler} value={confirmPassword}/>
            </label>

            <div className="field is-grouped is-grouped-centered">
                {
                   validateInputs() ? <div className="control">
                   <button className="button is-link is-rounded is-outlined" onClick={submitHandler}>Submit</button>
                   </div>:
                   <div className="control">
                   <button className="button is-link is-rounded is-outlined" disabled>Submit</button>
                   </div> 
                }

                <div className="control">
                <button className="button is-danger is-outlined is-rounded" onClick={cancelHandler}>Cancel</button>
                </div>

            </div>
            {serverError && <p style={{color: "red"}}>something went wrong please try again later!</p>}
            {emailExists && <p style={{color: "red"}}>Email already Exists please log in!</p>}

        </form>
    </Modal>
}; 


