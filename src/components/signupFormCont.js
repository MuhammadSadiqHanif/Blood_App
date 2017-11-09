import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
// import logoColored from '../logoColored.jpg';
import Paper from 'material-ui/Paper'
import logo from '../logo.svg';
import DatePicker from 'material-ui/DatePicker';
// import config from "../config/firebase";
import * as firebase from 'firebase'






class SignUpFormCont extends Component{
    constructor(){
        super()
        this.state={
            signupForm:{
                username:'',
                email:'',
                // password : '',
                gender : "",
                bloodGroup:"",
                gendervalue:"",
                bloodGroupvalue:"",
                dob:"",
                controlledDate:null,
                disease:"",
            
                values:''

            },
            
           
        }

        
       
    }


    
    

      selecthandleChange = (event, index, value ,name ,forValue) => { 
        
        let {signupForm} = this.state;
        signupForm[forValue]=value
        signupForm[name] = event.target.innerText
        this.setState({
            signupForm:signupForm
        })
        
      }
      

     updateState(email,username){
            this.setState({
                signupForm:{
                    email,
                    username
                }
            },console.log(this.state.signupForm))
     }   
       
    
       


    updatetoFirebaseDateBase(){

       

        let ref = firebase.database().ref();
        // let ref = firebase.database().ref()
        let obj = []
        // let email = ""
        // let username = ""
               

                // firebase.auth().createUserWithEmailAndPassword(this.state.signupForm.email, this.state.signupForm.password)
                firebase.auth().onAuthStateChanged(firebaseUser=>{
                    if(firebaseUser){
                        let uid = firebaseUser.uid
                        // console.log(uid)
                        
                            ref.child("users").child(uid).set({
                            username: this.props.location.state.username, //this data is coming form the history.push
                            email : this.props.location.state.email,
                            gender: this.state.signupForm.gender,
                            bloodGroup: this.state.signupForm.bloodGroup,
                            disease:this.state.signupForm.disease,
                            dob:this.state.signupForm.dob
                            });

                            this.props.history.push("/")
                    }
                    else{
                        console.log("not logged in");
                    }
                    

                  })
                // .then((res) => {
                //     if (res.uid) {
                //         console.log(res.uid)
                        // ref.child("users").child(res.uid).set({
                        //     email: this.state.signupForm.email,
                        //     username: this.state.signupForm.username,
                            // displayName: this.state.signupForm.username,
                            // photoURL: "https://avatars1.githubusercontent.com/u/844211?v=4&s=460"
                        // }); 
                        // alert("Sign up done");
                        // this.props.history.push("/")
                        // document.getElementById("signup").style.display = 'none'
                        // document.getElementById("signin").style.display = 'block'
                //     }
                // })
                // .catch((e) => {
                //     console.log("error", e);
                //     switch (e.code) {
                //         case 'auth/weak-password':
                //             alert(e.message)
                //             break;
                //         case 'auth/email-already-in-use':
                //             alert(e.message)
                //             break;
                //         default:
                //             null;
                //     }
                // })
            }


    changeHandler = (ev) => {
        let { signupForm } = this.state;
        signupForm[ev.target.name] = ev.target.value;
        
        this.setState({
            signupForm : signupForm
        })
    }
    
    handleClick=(ev)=>{
        ev.preventDefault();
        this.updatetoFirebaseDateBase()
        // console.log(this.props.location.state.email)
        // this.FirebaseAuthentication()
    }


    handleDateChange = (event, date) => {
        let dates = new Date(date)
        dates.toLocaleDateString()
        

        this.setState({
            signupForm:{
                controlledDate: dates,

            }
        },()=>{});
      };



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
                    <div className="alignLeft">
                    <SelectField
                    floatingLabelText="Frequency"
                    value={this.state.signupForm.gendervalue}
                    id="gender"
                    onChange={(event, index, value)=>this.selecthandleChange(event, index, value ,"gender" , "gendervalue")}
                    autoWidth={false}
                    hintText="jksahjhasjk"
                  >
                    <MenuItem value={1} primaryText="Male" />
                    <MenuItem value={2} primaryText="Female" />
                    {/* <MenuItem value={3} primaryText="Weeknights" />
                    <MenuItem value={4} primaryText="Weekends" />
                    <MenuItem value={5} primaryText="Weekly" /> */}
                  </SelectField>
                  <br />
                        <SelectField
                        floatingLabelText="Blood Group"
                        value={this.state.signupForm.bloodGroupvalue}
                        id = "bloodGroup"
                        onChange={(event, index, value)=>this.selecthandleChange(event, index, value ,"bloodGroup" , "bloodGroupvalue")}
                        autoWidth={false}
                        >
                        <MenuItem value={"O-"} primaryText="O-" />
                        <MenuItem value={"O+"} primaryText="O+" />
                        <MenuItem value={"A-"} primaryText="A-" />
                        <MenuItem value={"A+"} primaryText="A+" />
                        <MenuItem value={"B-"} primaryText="B-" />
                        <MenuItem value={"B+"} primaryText="B+" />
                        <MenuItem value={"AB-"} primaryText="AB-" />
                        <MenuItem value={"AB+"} primaryText="AB+" />
                        </SelectField>
                        
                        {/* <br/> */}
                        <br/>
                        
                        <DatePicker 
                            hintText="Date of Birth" 
                            floatingLabelText="Date of Birth"
                            openToYearSelection={true} 
                            autoOk={true} 
                            value={this.state.signupForm.controlledDate}
                            onChange={this.handleDateChange}
                            disabled={true}
                        />
                        {/* <br /> */}
                    
                        <TextField 
                        hintText="Any Disease"
                        floatingLabelText="Any Disease"
                        type="text"
                        name="disease"
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


  
  export default SignUpFormCont

       


