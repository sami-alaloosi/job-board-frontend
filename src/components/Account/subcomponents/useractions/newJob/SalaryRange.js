import React, {useState} from 'react';



export default function SalaryRange({setSalaryRange}){
    const salaryType = {
        yearly: "$ / Year",
        hourly: "$ / Hour"
    }
    const [yearly, setYearly] = useState(true);
    const [salaryFrom, setSalaryFrom] = useState("");
    const [salaryTo, setSalaryTo] = useState("");

    const salaryTypeHandler = (e) =>{
        if (e.target.value === "hourly"){
         setYearly(false);
         if (salaryFrom.includes(salaryType.yearly)) setSalaryFrom(salaryFrom.replace(salaryType.yearly, salaryType.hourly));
         if (salaryTo.includes(salaryType.yearly)) setSalaryTo(salaryTo.replace(salaryType.yearly, salaryType.hourly));
        } else {
         setYearly(true); 
         if (salaryFrom.includes(salaryType.hourly)) setSalaryFrom(salaryFrom.replace(salaryType.hourly, salaryType.yearly));
         if (salaryTo.includes(salaryType.hourly)) setSalaryTo(salaryTo.replace(salaryType.hourly, salaryType.yearly));
        }
        salaryFormatter();
     };

     const salaryHandler = (e) => {
        if (e.target.id === "from"){
            const val = e.target.value.replace(/[^0-9]/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            setSalaryFrom(val);
            
        } else if (e.target.id === "to"){
            const val = e.target.value.replace(/[^0-9]/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            setSalaryTo(val);
        }
        salaryFormatter();
    };


    const onBlurHandler = () => {
        const fromInt = parseInt(salaryFrom);
        const toInt = parseInt(salaryTo);
        if (fromInt !== NaN && fromInt > 0 && (!salaryFrom.includes(salaryType.yearly)  && !salaryFrom.includes(salaryType.hourly))){
            yearly ? setSalaryFrom(salaryFrom + salaryType.yearly) : setSalaryFrom(salaryFrom + salaryType.hourly);
        }
        if (toInt !== NaN && toInt > 0 && (!salaryTo.includes(salaryType.yearly) && !salaryTo.includes(salaryType.hourly))){
            yearly ? setSalaryTo(salaryTo + salaryType.yearly) : setSalaryTo(salaryTo + salaryType.hourly)
        } 
    };
    
    const onFocusHandler = (e) => {
        if (e.target.id === "from"){
            setSalaryFrom(salaryFrom.replace(/[^0-9]/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","))
        } else {
            setSalaryTo(salaryTo.replace(/[^0-9]/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        }
    }; 

    const salaryFormatter = () => {
        let fromSalary = salaryFrom.replace(/[^0-9]/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        let toSalary = salaryTo.replace(/[^0-9]/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (yearly){
            const i = fromSalary.indexOf(",");
            const shortenedF =  fromSalary.slice(0, i) + "k";
            const j = toSalary.indexOf(",");
            const shortenedT = toSalary.slice(0, j) + "k";
            const combined = shortenedF + "-" + shortenedT; 
            console.log(combined);
            setSalaryRange({yearly: true, range: combined});

        } else {
            setSalaryRange({yearly: false, range: fromSalary +"h" + "-" + toSalary + "h"})
        }
    };

 
    return (
        <>
           <label className="label">Salary Range</label>
            <div className="field" onChange={salaryTypeHandler}>
                <div className="control">
                <label className="radio">
                <input type="radio" name="range" value="hourly"/>
                Hourly
            </label>
            <label className="radio">
                <input type="radio" name="range" value="yearly" defaultChecked/>
                Yearly
            </label>
               </div>
            </div>
            {/*  */}
            
            <div className="field is-horizontal">
                <div className="field-body">
                    <div className="control">
                        <input className="input"
                         onBlur={onBlurHandler}  
                         onFocus={onFocusHandler}
                         placeholder="from" id="from" 
                         value={salaryFrom} onChange={salaryHandler}
                         />
                    </div>
                    
                    <div className="control">
                        <input className="input" 
                         onBlur={onBlurHandler} 
                         onFocus={onFocusHandler}
                         placeholder="Up to" id="to" 
                         value={salaryTo} onChange={salaryHandler} 
                         style={{ marginLeft: "10px"}}/>
                    </div>
                </div>
                
            </div>

        </>
    )
};