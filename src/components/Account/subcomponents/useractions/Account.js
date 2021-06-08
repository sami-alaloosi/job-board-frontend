import React, {useEffect, useState} from 'react';
import baseURL from "../../../../Server";

export default function Account(){
    // _ do not edit these are for the initail values 
    const [_email, _setEmail] = useState("");
    const [_firstName, _setFirstName] = useState("");
    const [_lastName, _setLastName] = useState("");

    // editable 
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");


    // password 
    const [passwordOld, setPasswordOld] = useState("");
    const [newPassword, setNewPassword] = useState("");

    // modes 
    const [editMode, setEditMode] = useState(false);
    const [changePasswordMode, setChangePasswordMode] = useState(false); 

    // errors || success 
    const [error, setError] = useState({msg: "", isError: false});
    const [success, setSuccess] = useState({msg: "", isSuccess: false});

    useEffect( ()=>{
        (async ()=>{
            const {data : user} = await baseURL.get(`/user/${localStorage.getItem("userId")}`);
            _setEmail(user.email);
            _setFirstName(user.firstName);
            _setLastName(user.lastName);
         })()
    }, []);

    const setModeHandler = () =>{
        if (!editMode){
            setEditMode(!editMode);
            setEmail(_email);
            setFirstName(_firstName);
            setLastName(_lastName);
        } else {
            setEditMode(!editMode);
            setEmail("");
            setFirstName("");
            setLastName("");
        }
    };

    const setSuccessHandler = (msg) => {
        setSuccess({msg, isSuccess: true});
        setTimeout(()=> {
            setSuccess({msg: "", isSuccess: false}); 
        }, 3000);
    }; 

    const setErrorHandler = (msg) => {
        setError({msg, isError: true});
        setTimeout(()=>{
            setError({msg: "", isError: false}); 
        }, 5000);
    };

    const passwordChangeHandler = async () => {
        //  user/password
        try {
            const response = await baseURL.patch("/user/password", {
                "password" : passwordOld,
                "newPassword" : newPassword,
                "userId" : localStorage.getItem("userId"),
            });
            if (response.status === 200){
                setPasswordOld("");
                setNewPassword(""); 
                setSuccessHandler("password changed successfuly");
                setChangePasswordMode(!changePasswordMode);
            } 

        } catch(err){
            if (err.response.data.error && typeof err.response.data.error === "string"){
                setErrorHandler(err.response.data.error);
            } else {
                setErrorHandler("something went wrong please try again")
            }
        }
      
        
    }; 

    const accountEditHandler = async () => {
        const reqdata = () =>{
            if (email === _email){
                return {
                        "firstName" : firstName,
                        "lastName" : lastName,
                        "userId" : localStorage.getItem("userId")
                    }
                
            } else {
                return {
                    "firstName" : firstName,
                    "lastName" : lastName,
                    "userId" : localStorage.getItem("userId"),
                    "email" : email
                }
            }
        }
        try {
            const response = await baseURL.patch("/user", reqdata());
            if (response.status === 200){
                _setEmail(email);
                _setFirstName(firstName);
                _setLastName(lastName); 
                setFirstName(""); setLastName(""); setEmail(""); 
                setEditMode(!editMode); 
                setSuccessHandler("Account updates successfully proccessed");
            }
        } catch(err){
                setErrorHandler("something went wrong please try again");
        }
    }; 

    return (
        <div className="field">

                {
                    error.isError ?
                    <div  className="notification is-danger is-light has-text-centered">{error.msg} <i class="fas fa-exclamation-triangle"></i></div> : null
                }

                {
                    success.isSuccess ?
                     <div  className="notification is-success has-text-centered">{success.msg} <i class="fas fa-clipboard-check"></i></div> 
                     : null 
                }

                <div className="field is-grouped is-grouped-centered">
                <div className="control">
               <label className="label">
                   First Name
                   {
                       editMode === true ? <input className="input" 
                       onChange={(e)=>setFirstName(e.target.value)} value={firstName}/>
                     :  <input className="input" disabled value={_firstName}/>
                   }
       
               </label>
               </div>
               </div>

                <div className="field is-grouped is-grouped-centered">
                <div className="control">
               <label className="label">
                  Last Name
                  {
                       editMode === true? <input onChange={(e)=>setLastName(e.target.value)} className="input" value={lastName}/>
                        : <input className="input" disabled value={_lastName}/>
                   }
              
               </label>
               </div>
               </div>


               <div className="field is-grouped is-grouped-centered">
                <div className="control">
               <label className="label">
                  User Email
                  {
                       editMode === true ? <input className="input" onChange={(e)=>setEmail(e.target.value)} value={email}/> :  <input className="input" disabled value={_email}/>
                  }

               </label>
               </div>
               </div>



               <div className="field is-grouped is-grouped-centered">
             
                <p className="control">
                    <button className={editMode ? "button" : "button is-info"} onClick={()=> {setModeHandler()}}>
                   {editMode ? "Cancel" : "Edit Account"}
                    </button>
                </p>

                <p className="control">
                    {
                        changePasswordMode ?  <button className="button is-link is-light" disabled>Change Password</button> :
                        <button className="button is-link is-light" onClick={()=> setChangePasswordMode(!changePasswordMode)}>
                        Change Password
                        </button>
                    }
               
                </p>

               </div>

                  {
                    changePasswordMode ? 
                    <div className="field">
                          <div className="field is-grouped is-grouped-centered">
                            <div className="control">
                            <label className="label">
                                Old Password
                                <input className="input" placeholder="enter old password" value={passwordOld} onChange={(e)=> setPasswordOld(e.target.value)}/>
                            </label>
                        </div>
                          </div>

                          <div className="field is-grouped is-grouped-centered">
                            <div className="control">
                            <label className="label">
                                new Password
                                <input className="input" placeholder="enter old password" value={newPassword} onChange={(e)=> setNewPassword(e.target.value)}/>
                            </label>
                        </div>
                          </div>
                          <div className="field is-grouped is-grouped-centered">
                            <div className="control">
                            {
                                passwordOld.length && newPassword.length ?  <button onClick={passwordChangeHandler} className="button is-link">Submit Password</button> : 
                                <button disabled className="button is-link">Submit Password</button>
                            }
                            {
                                <button style={{marginLeft:"10px"}} className="button"
                                 onClick={()=> {setNewPassword(""); setPasswordOld(""); setChangePasswordMode(!changePasswordMode)}}>Cancel</button>
                            }
                        </div>
                          </div>
                       
                    </div>
                      : null
                }
                        {editMode ? <div className="field is-grouped is-grouped-centered">
             
                        <p className="control">
                            <button className="button is-link" onClick={()=> {accountEditHandler()}}>
                                Submit 
                            </button>
                        </p>

                      
                        </div>
                    : null}
        </div>
    )
}; 