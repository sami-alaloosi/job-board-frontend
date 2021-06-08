import {Component} from 'react';

export default class EmptyWarn extends Component {
    render(){
        return <div className="notification is-warning is-light mt-3">
            {this.props.children}
        </div>
    }
}