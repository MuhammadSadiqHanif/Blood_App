import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
// import logoColored from '../logoColored.jpg';
import Paper from 'material-ui/Paper'
import logo from '../logo.svg';
// import config from "../config/firebase";
import * as firebase from 'firebase'



class SignUpForm extends Component{
    constructor(){
        super()
        this.state={
            signupForm:{
                username:'',
                email:'',
                password : '',

            },
           
        }
       
    }


    FirebaseAuthentication(){

       

        let ref = firebase.database().ref();

                firebase.auth().createUserWithEmailAndPassword(this.state.signupForm.email, this.state.signupForm.password)
                .then((res) => {
                    if (res.uid) {
                        // ref.child("user").child(res.uid).set({
                        //     email: this.state.signupForm.email,
                        //     username: this.state.signupForm.username,
                            // displayName: this.state.signupForm.username,
                            // photoURL: "https://avatars1.githubusercontent.com/u/844211?v=4&s=460"
                        // }); 
                        alert("Sign up done");
                        // this.props.history.push("/")
                        // this.props.history.push("signupCont",this.state.signupForm)
                        this.props.history.push({
                            pathname:"signupCont",
                            state:{email:this.state.signupForm.email,
                                    username:this.state.signupForm.username    
                            }
                        })
                        // document.getElementById("signup").style.display = 'none'
                        // document.getElementById("signin").style.display = 'block'
                    }
                })
                .catch((e) => {
                    console.log("error", e);
                    switch (e.code) {
                        case 'auth/weak-password':
                            alert(e.message)
                            break;
                        case 'auth/email-already-in-use':
                            alert(e.message)
                            break;
                        default:
                            null;
                    }
                })
            }


    changeHandler = (ev) => {
        // console.log(ev.target.name , ev.target.value)
        let { signupForm } = this.state;
        signupForm[ev.target.name] = ev.target.value;
        // form[ev.target.name] = ev.target.value;
        // console.log(this.state)
        
        this.setState({
            signupForm : signupForm
        })
        // let { form } = this.state;
        // form[ev.target.name] = ev.target.value;
        // this.setState({ form: form });
    }
    
    handleClick=(ev)=>{
        ev.preventDefault();
        // this.props.history.push("signupCont")
        
        // console.log(this.state.signupForm)
        this.FirebaseAuthentication()
    }



    render(){
        return(

            <div>

           

<div className="divForBlock">
     <Paper  zDepth={3} className="signupPaper">
    
    <div className="centered2">
                <div>
                    {/* <img src={logoColored} className="App-logo" alt="logo" /> */}
                    <img src={logo} className="App-logo" alt="logo" />
                    </div>
                    {/* <div> */}
                        <h3>Sign Up</h3>
                    {/* </div> */}
                    <div>
                        <TextField 
                        hintText="Type Username"
                        floatingLabelText="User Name"
                        type="text"
                        name="username"
                        className = "lessTop"
                        onChange = {this.changeHandler}
                        
                        />  <br />
                        <TextField 
                        hintText="Type Email"
                        floatingLabelText="Email Address"
                        type="email"
                        name="email"
                        onChange = {this.changeHandler}
                        required="true"
                        />  <br />
                        <TextField 
                        hintText="Type Password"
                        floatingLabelText="Password"
                        type="password"
                        name="password"
                        onChange = {this.changeHandler}
                        
                        />  <br />
                    
                        <TextField 
                        hintText="Password Field"
                        floatingLabelText="ReType Password"
                        type="password"
                        name="password2"
                        onChange = {this.changeHandler}
                        required="true"
                        /><br /><br/><br/>
                    </div>
                    <RaisedButton label="Sign Up" onClick={this.handleClick} fullWidth={false} secondary={true} className="button" />

    </div>
    </Paper>

</div>

            </div>
        )
    }

}


  
  export default SignUpForm

       


