import React from "react";
import { BrowserRouter , Switch, Route} from 'react-router-dom'
import Nav from './Nav/Nav';
import Home from './Home/Home';
import Jobs from './components/Jobs/Jobs';
import Account from './components/Account/Account';
import "./assets/app.css"; 
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: "",
      token: ""
    };
    this.updateUser = this.updateUser.bind(this); 
  }
  componentDidMount(){
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user"); 
    if ((token && user) && token.length && user.length){
        this.setState({user, token}); 
    };
}
  updateUser(action, login={user: "", token: "", userId: "", userDetails:{}}){
    switch(action){
      case "out": 
      this.setState({user: "", token: ""});
      localStorage.removeItem("token");
      localStorage.removeItem("user"); 
      localStorage.removeItem("userId");
      localStorage.removeItem("userDetails");      
      break; 
  default: 
      const {user, token, userId, userDetails} = login; 
      this.setState({user, token}); 
      localStorage.setItem("token", token);
      localStorage.setItem("user", user); 
      localStorage.setItem("userId", userId);
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      break;
    }
  };

  

  render(){
    return (
      <BrowserRouter>
        <Nav user={this.state.user} updateUser={this.updateUser} token={this.state.token}/>
        <hr />

        <Switch>

          <Route exact path="/">
              <Home />
          </Route>

          <Route path="/jobs">
            <Jobs user={this.state.user}/>
          </Route>

          <Route path="/account">
            <Account />
          </Route>

        </Switch>

      </BrowserRouter>
  )};
};