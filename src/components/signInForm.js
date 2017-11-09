import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
// import logoColored from '../logoColored.jpg';
import Paper from 'material-ui/Paper'
import logo from '../logo.svg';
import {
    Link
  } from 'react-router-dom'
  import * as firebase from 'firebase'

 
import { connect } from 'react-redux';
import StoreAction from '../store/actions/action';


  function mapStateToProps(state) {
    return {
        incMe: state.incrementCounter.incrementStateValue,
        dec: state.decrementCounter.decrementStateValue,
        log: state.loggedStatus.loggedStatusValue,
    }
  }


function mapDispatchToProps(dispatch) {
    return {
        // increment: (value) => {
        //     return dispatch({ type: actionType.INCREMENT, val: value })
        // },
        // decrement: () => dispatch({ type: actionType.DECREMENT })
        increment: (value) => {
            return dispatch({ type: StoreAction.increment(), val: value })
        },
        decrement: () => dispatch({ type: StoreAction.decrement() }) ,
        loggedIn: () => dispatch(StoreAction.loggedIn()),
        loggedOut: () => {dispatch(StoreAction.loggedOut())
          
         } 
        }
  }
  


class SignInForm extends Component{
    constructor(){
        super()
        this.state={
            signInForm:{
                // username:'',
                email:'',
                password : '',

            },
           
        }
       
    }


     signin = () => {


        let email = this.state.signInForm.email
        let pass = this.state.signInForm.password

        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then((res) => {
                localStorage.setItem("users", JSON.stringify(res));
                window.location.href = "./dashboardList"
                // this.props.loggedIn()

                

            })
            .catch((e) => {
                console.log(e);
                switch (e.code) {
                    case "auth/wrong-password": // wrong password on sign in
                        alert(e.message)
                        break;
                    case "auth/user-not-found": // user not found on sign in on wrong email
                        alert(e.message)
                        break;
                }
            })
    }

    changeHandler = (ev) => {
        // console.log(ev.target.name , ev.target.value)
        let { signInForm } = this.state;
        signInForm[ev.target.name] = ev.target.value;
        // form[ev.target.name] = ev.target.value;
        // console.log(this.state)
        
        this.setState({
            signInForm : signInForm
        })
        // let { form } = this.state;
        // form[ev.target.name] = ev.target.value;
        // this.setState({ form: form });
    }
  



    render(){
        return(

            <div>

           

<div className="divForBlock">
     <Paper  zDepth={3} className="block">
    
    <div className="centered2">
                <div>
                    {/* <img src={logoColored} className="App-logo" alt="logo" /> */}
                    <img src={logo} className="App-logo" alt="logo" />
                    </div>
                    <div>
                        <h3>Sign In</h3>
                    </div>
                    <div>
                        <TextField 
                        hintText="Type Email"
                        floatingLabelText="Email Address"
                        type="email"
                        name="email"
                        onChange={this.changeHandler}
                        required="true"
                        />  <br />
                    
                        <TextField 
                        hintText="Password Field"
                        floatingLabelText="Password"
                        type="password"
                        name="password"
                        onChange={this.changeHandler}

                        required="true"
                        /><br /><br/><br/>
                    </div>
                    <RaisedButton label="Sign In" fullWidth={false} primary={true} className="button" onClick={()=>this.signin()} />
                    <br/><br/>
                    <RaisedButton label="Sign Up" secondary={true}  className="button" onClick={()=>{this.props.history.push('/signup')}} />

                  

    </div>
    </Paper>

</div>

            </div>
        )
    }

}


  
  export default connect(mapStateToProps,mapDispatchToProps)(SignInForm)

       


