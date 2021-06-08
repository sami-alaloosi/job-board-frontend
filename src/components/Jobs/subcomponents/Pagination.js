import React from 'react'; 
import fillArray from './helpers/fillArray';

export default function Pagination(props){

    return (
        <nav className="pagination mb-1" role="navigation" aria-label="pagination">
            {
                props.page === 1 ?  <div className="pagination-previous"  disabled>Previous</div> : 
                <div className="pagination-previous" onClick={()=>{props.changePage(props.page - 1)}}>Previous</div>
            }

            {
                props.page < props.lastPage ?  <div onClick={()=>{props.changePage(props.page + 1)}} 
                className="pagination-next">Next page</div> :
                <div className="pagination-next" disabled>Next page</div>
            }
            
            <ul className="pagination-list">
                {
                    fillArray(props.lastPage).map(page => {
                        return (
                            <li key={page}>
                            <span className={props.page === page ? "pagination-link is-current" : "pagination-link"}
                            onClick={()=>{props.changePage(page)}}>{page}</span>
                            </li>
                            )
                    })
                }
    
            </ul>

        </nav>
    )
}; 


