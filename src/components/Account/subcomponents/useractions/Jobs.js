import React, {useEffect, useState} from 'react';
import baseURL from "../../../../Server";

export default function Jobs(){
    const [appliedJobs, setAppliedJobs] = useState([]);

    useEffect(()=>{
        (async()=>{
            try {
                const {data : user} =  await baseURL.get(`/user/${localStorage.getItem("userId")}`); 
                setAppliedJobs(user.appliedJobs);
            } catch(err){

            }
          
        })()
    }, []);
    console.log(appliedJobs)
    return (
        <div>
            {
                appliedJobs.length ? 
                appliedJobs.map(job => {
                    return <div key={job.id} className="box">
                        <div className="is-flex is-justify-content-space-between">
                        <h3 className="title">{job.title}</h3>
                        <div className="control">
                            <button className="button is-danger" onClick={async ()=>{
                               const res = await baseURL.put(`/app/${job.id}`, {
                                    userId: localStorage.getItem("userId")
                                });
                                if (res.status === 201){
                                    const newAppliedJobs = [...appliedJobs];
                                    setAppliedJobs(newAppliedJobs.filter(({id})=> id !== job.id));
                                }
                            }}>
                                Withdraw</button>
                        </div>
                        </div>
                    </div>
                }) : <div className="notification has-text-centered">You have not Yet Applied for any jobs!</div>
            }
        </div>
    )
}; 