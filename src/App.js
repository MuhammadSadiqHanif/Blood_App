import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import Home from "./components/Home"
import SignInForm from "./components/signInForm";
import SignUpForm from "./components/signupForm";
import SignUpFormCont from "./components/signupFormCont";
import DashboardList from "./components/dashboardList";
import MainDashboard from './components/mainDashboard'
// import DialogBox from "./components/dialog"
import Header from './components/header'
import * as firebase from 'firebase'


// import * as firebase from 'firebase'
// import "./config/firebase"


// SignInForm
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom"





class App extends Component {
  constructor(){
    super();

    this.state={
        loginType : ''
    }
  }

  componentWillMount() {


    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        // console.log(firebaseUser)
        this.setState({
          loginType: true
        })

      } else {
        console.log("not logged in");
        this.setState({
          loginType: false
        })
      }


    })
  }
    
  
  signOut=(props)=>{
        // this.props.loggedOut()
        firebase.auth().signOut();
        this.setState({
          loginType :false
        })
        // this.history.push("/");
        alert("sign out done");
        window.location.href = "./"
      
      }



  render() {
    // console.log("APP", this.props)

    return (
      <div>
        {/* <Home/>  */}

        <Router>
          <div>
            {/* <ul> */}
            {/* <li> <Link to="/" > sign In </Link> </li>
            <li> <Link to="/home" > Home </Link> </li>
            <li> <Link to="/about" > About us </Link> </li>
            <li> <Link to="/signup" > sign Up </Link> </li> */}


            <Header loginType={this.state.loginType} signOut={this.signOut} />
            {/* </ul> */}
            <Route exact path="/" loginType={this.state} component={MainDashboard} />
            <Route path="/signInForm" component={SignInForm} />
            <Route path="/signup" component={SignUpForm} />
            <Route path="/signupCont" component={SignUpFormCont} />
            <Route path="/dashboardList" component={DashboardList} />
            {/* <Route path="/dialogbox" component={DialogBox} /> */}
            
            

            

            {/* <Route path="/home" component={Home} /> */}
            {/* <Route path="/about" component={About} /> */}




          </div>
        </Router>
      </div>
    );
  }
}

export default App;
