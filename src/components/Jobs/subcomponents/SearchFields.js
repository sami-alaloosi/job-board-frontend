import React from 'react'; 

export default function SearchFields(){

    return   <form className="search-job-container" id="search-field">
    <div className="field is-grouped is-grouped-centered">

    {/* search bar */}
    <p className="control has-icons-left has-icons-right">
    <input className="input is-info" placeholder="Search for Keywords"/>
        {/* left icon */}
        <span className="icon is-small is-left">
        <i className="fas fa-laptop"></i>
        </span>
        {/* right icon  */}
        <span className="icon is-small is-right">
        <i className="fas fa-search"></i>
        </span>
    </p>

    {/* category List */}
    <div className="select is-info">
    <select>
        <option>Select Category</option>
        <option>With options</option>
    </select>
    </div>


    {/* submit  */}
    <div className="control" id="advanced-job-search">
        <button className="button">Search</button>
    </div>
    
    </div>
    
</form>
}; 