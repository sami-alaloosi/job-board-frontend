import React, { useEffect, useState } from 'react';
import Modal from '../../General/Modal';
import AuthFieldContainer from './AuthStyle';
import {validate} from 'email-validator'; 
import baseURL from '../../Server';

export default function Login({showLogin, closeModal, updateUser}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [invalidCreds, setInvalidCreds] = useState(false);
    const [serverError, setServerError] = useState(false); 

    useEffect(()=>{
        if (showLogin === false){
            setEmail("");
            setPassword("");
            setInvalidCreds(false);
            setServerError(false); 
        }
    }, [showLogin])

    const onSubmitHandler = async (e) => {
        e.preventDefault(); 
        try {
            if (validateFields() === true){
                const res = await baseURL.post("/entry/login", {email, password}); 
                if (res.status === 200){
                    updateUser("in", 
                    {
                        user: res.data.email,
                        token: res.data.token,
                        userId: res.data.userId,
                        userDetails: {appliedJobs: res.data.appliedJobs, resume: res.data.resume}
                    });
                    setEmail(""); setPassword(""); setServerError(false); setInvalidCreds(false); 
                    closeModal(); 
                }
            } 
        } catch (err){
            if (err.response.status === 401){
                setInvalidCreds(true);
            } else {
                setServerError(true); 
            }
        }
       
    }

    const validateFields = () => {
        if (validate(email) && password.length){
            return true;
        } else {
            return false; 
        }
    }; 

    const cancelHandler = (e) => {
        e.preventDefault();
        setPassword("");
        setEmail("");
        closeModal();
    }; 

    return <Modal modalClassName={showLogin ? "modal is-active" : "modal"} closeModal={closeModal}>
        <h1 className="title is-4 has-text-centered">Login</h1>
        <form id="form-login" style={AuthFieldContainer} onSubmit={onSubmitHandler}>
        <label className="label">
            Email
            <input className="input" type="text" placeholder="Email" 
            onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
        </label>
        <label className="label">
            Password
        <input className="input" type="password" placeholder="Password"
         onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
        </label>

        <div className="field is-grouped is-grouped-centered">
                {
                  validateFields() ? <div className="control">
                   <button className="button is-link is-rounded is-outlined" onClick={onSubmitHandler}>Submit</button>
                   </div>:
                   <div className="control">
                   <button className="button is-link is-rounded is-outlined" disabled>Submit</button>
                   </div> 
                }

                <div className="control">
                <button className="button is-danger is-outlined is-rounded"
                 onClick={(e)=>{cancelHandler(e)}}>Cancel</button>
                </div>

            </div>
            {serverError && <p style={{color:"red"}}>Something went wrong please try again later!</p>}
           {invalidCreds && <p style={{color:"red"}}>Invalid Credentials!</p>}
        </form>
    </Modal>
}; 