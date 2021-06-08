import React from "react";

export default class Modal extends React.Component { 
    render(){
        return <div id="modal" className={this.props.modalClassName || "modal"}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="modal-card">
            <div className="card">
            {this.props.children}
            </div>
          </div>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={this.props.closeModal}></button>
      </div>

    }; 
}; 