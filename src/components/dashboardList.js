import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import RaisedButton from 'material-ui/RaisedButton';
import Header from './header'
import * as firebase from 'firebase'



class DataList extends React.Component{
  constructor(props) {
    super(props);
  this.state={
    user:this.props.user,
    ind:this.props.ind
  }
}
  // componentWillMount(){
  //   console.log(this.state)
  // }
render(){
// console.log("shsghghj")
  return (
    <li className="flex-item" key={this.state.ind} onClick={() => this.props.handleOpenDialog(this.state.ind)}>

      <div className='imgdiv'>
        <svg className="img" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z">
          </path>
        </svg>
      </div>
      <div className="userDetail" >
        <span><span className="listTitle">Doner:</span> {this.state.user.username}</span>
        <br />
        <span><span className="listTitle">Blood Group:</span> {this.state.user.bloodGroup}</span>
        <br />
        <span><span className="listTitle">Gender:</span> {this.state.user.gender}</span>
      </div>
    </li>
    // <div>hello world</div>

        )
      }
}


class DialogBox extends React.Component {
  state = {
    open: false,
    users: this.props.state.users,
    ind: this.props.state.ind,
    bloodGroup: "",
    disease: "",
    dob: "",
    email: "",
    gender: "",
    username: ""
  };

  componentWillMount() {
    // console.log(this.state.users)
    let ind = this.state.ind
    this.setState({
      bloodGroup: this.state.users[ind].bloodGroup,
      username: this.state.users[ind].username,
      email: this.state.users[ind].email,
      gender: this.state.users[ind].gender,
      dob: this.state.users[ind].dob,
      disease: this.state.users[ind].disease,

    })
  }



  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.handleCloseDialog}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.props.handleCloseDialog}
      />,
    ];

    return (
      <Dialog
        title="Donar's Detail"
        actions={actions}
        modal={false}
        open={true}
        onRequestClose={this.handleClose}
        className="dialogBox"
      >
        {/* The actions in this window were passed in as an array of React objects. */}
        <table >
          <tbody>
            <tr><th> Donar Name :</th><th>{(this.state.username).toUpperCase()}</th></tr>
            <tr><th> Email Address :</th><td>{this.state.email}</td></tr>
            <tr><th> Gender :</th><td>{this.state.gender}</td></tr>
            <tr><th> Blood Group :</th><td>{this.state.bloodGroup}</td></tr>
            <tr><th> Date Of Birth :</th><td>{this.state.dob}</td></tr>
            <tr><th> Disease :</th><td>{this.state.disease}</td></tr>

          </tbody>
        </table>


      </Dialog>
    )

  }
}


export default class DashboardList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,

      users: [],
      user: "",
      ind: 0,
      loginStatus: false,
      currentUserBloodGroup: "",
      currentUserRhFactor: ""
      // dialog : false

    };

  }

  componentWillMount() {
    let obj = []
    let obj2 = []
    let sortObj = []
    let bloodGroup = ""


    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        // console.log(firebaseUser.uid)
        firebase.database().ref("users")
          .child(firebaseUser.uid).child("bloodGroup").once("value").then((snapshot) => {
            bloodGroup = snapshot.val()
            // console.log(bloodGroup)
            this.setState({
              loginStatus: true,
              currentUserBloodGroup: bloodGroup,



            }, () => { console.log(this.state.currentUserBloodGroup) })


          })

      }else {
        this.setState({
          loginStatus: false,
          // currentUserBloodGroup: bloodGroup,



        }, () => { console.log(this.state.currentUserBloodGroup) })
      }


    })
    // firebase.database().ref('users')
    // .on("child_added",(snap)=>{
    //   var snapval = snap.val();

    //   if (snapval){
    //     obj = [...obj,snapval]
    //     // console.log(snapval)
    //     // console.log(obj)

    //     this.setState({
    //       users : obj
    //     },()=>{
    //       // console.log(this.state.users)

    //       this.state.users.map((user)=>{

    //         if(this.state.currentUserBloodGroup === "O+" || this.state.currentUserBloodGroup==="O-"
    //         && user.bloodGroup === "O+" || user.bloodGroup === "O-"){

    //           console.log(user);
    //           obj2  = [...obj2,user]



    //        }

    //       })






    //     })
    //   }





    // })









    firebase.database().ref('users')
      .on("child_added", (snap) => {
        var snapval = snap.val();

        if (snapval) {
          obj = [...obj, snapval]
          // console.log(snapval)
          // console.log(obj)

          this.setState({
            users: obj
          },()=>{console.log(this.state.users)})
        }




      })

  }

  // componentWillReceiveProps(nextProps) {
  //   let obj = []

  //   firebase.database().ref('users')
  //   .on("child_changed",(snap)=>{
  //     var snapval = snap.val();
  //     // console.log(snapval)

  //     obj = [...obj,snapval]
  //     // console.log(obj)

  //     // this.setstate({
  //     //   user : snapval,
  //     // })
  //     this.setState({
  //       users : obj
  //     })

  //   })

  // }
  // handleOpenDialogBox=()=>{
  //   this.setState({
  //     dialog : true
  //   })
  //   // alert("dialj'jjasj")
  //   console.log("gsdjhjsfjkshkj")
  // }

  handleCloseDialog = () => {
    this.setState({ open: false });
  };
  handleOpenDialog = (ind) => {
    this.setState({
      open: true,
      ind: ind
    });

  };

  // handleToggle = () => this.setState({open: !this.state.open});

  render() {
    let currentUserRhFactor = ""


    // console.log("this is the consool befor return")
    return (
      <div>





        <ul className="flex-container">
          {this.state.open ?
            <DialogBox handleCloseDialog={this.handleCloseDialog} state={this.state} handleOpenDialog={this.handleOpenDialog} /> :
            null
          }
          {this.state.users.map((user, ind) => {
            
            if (this.state.currentUserBloodGroup) {
              // return <DataList user={user} ind={ind}/> /////this is runing ........////////////
              currentUserRhFactor = this.state.currentUserBloodGroup.slice(-1);
//// main condtion bloog Group O
              if (
                (this.state.currentUserBloodGroup === "O-" || this.state.currentUserBloodGroup === "O+") //checck this
                && // and 
                (user.bloodGroup === "O-" || user.bloodGroup === "O+") //check this
              ) {
                                if (
                                  (this.state.currentUserBloodGroup === "O-") //checck this
                                  && // and 
                                  (user.bloodGroup === "O-") //check this
                                  )return <DataList user={user} ind={ind} key={ind} handleOpenDialog={this.handleOpenDialog}/>
                                  else if (this.state.currentUserBloodGroup === "O+"
                                  &&
                                  (user.bloodGroup === "O-" || user.bloodGroup === "O+"))
                                  return <DataList user={user} ind={ind} key={ind} handleOpenDialog={this.handleOpenDialog}/>
                } 



                else if (
                  (this.state.currentUserBloodGroup === "A-" || this.state.currentUserBloodGroup === "A+") //checck this
                  && // and 
                  (user.bloodGroup === "A-" || user.bloodGroup === "A+" || user.bloodGroup === "O+" || user.bloodGroup === "O-") //check this
                ) {
                                if(this.state.currentUserBloodGroup === "A-" 
                                &&
                                (user.bloodGroup === "A-" || user.bloodGroup === "O-")
                                )return <DataList user={user} ind={ind} key={ind} handleOpenDialog={this.handleOpenDialog}/>
                                else if(this.state.currentUserBloodGroup === "A+"
                                && // and 
                                (user.bloodGroup === "A-" || user.bloodGroup === "A+" || user.bloodGroup === "O+" || user.bloodGroup === "O-"))
                                return <DataList user={user} ind={ind} key={ind} handleOpenDialog={this.handleOpenDialog}/>
                  } 
                
                
                
                else if (
                  (this.state.currentUserBloodGroup === "B-" || this.state.currentUserBloodGroup === "B+") //checck this
                  && // and 
                  (user.bloodGroup === "B-" || user.bloodGroup === "B+" || user.bloodGroup === "O+" || user.bloodGroup === "O-") //check this
                ) {
                                if(this.state.currentUserBloodGroup === "B-" 
                                &&
                                (user.bloodGroup === "B-" || user.bloodGroup === "O-")
                                )return <DataList user={user} ind={ind} key={ind} handleOpenDialog={this.handleOpenDialog}/>
                                else if(this.state.currentUserBloodGroup === "B+"
                                && // and 
                                (user.bloodGroup === "B-" || user.bloodGroup === "B+" || user.bloodGroup === "O+" || user.bloodGroup === "O-"))
                                return <DataList user={user} ind={ind} key={ind} handleOpenDialog={this.handleOpenDialog}/>



                } else if (
                  (this.state.currentUserBloodGroup === "AB-" || this.state.currentUserBloodGroup === "AB+") //checck this
                  && // and 
                  (user.bloodGroup === "AB-" || user.bloodGroup === "AB+" || user.bloodGroup === "O+" || user.bloodGroup === "O-"||user.bloodGroup === "A-"||user.bloodGroup === "A+" ||user.bloodGroup === "B-" || user.bloodGroup === "B-") //check this
                ) {
                                if(this.state.currentUserBloodGroup === "AB-" 
                                &&
                                (user.bloodGroup === "AB-" || user.bloodGroup === "O-" || user.bloodGroup === "B-" || user.bloodGroup === "A-")
                                )return <DataList user={user} ind={ind} key={ind} handleOpenDialog={this.handleOpenDialog}/>
                                else if(this.state.currentUserBloodGroup === "AB+"
                                && // and 
                                (user.bloodGroup === "AB-" || user.bloodGroup === "AB+" || user.bloodGroup === "O+" || user.bloodGroup === "O-"||user.bloodGroup === "A-"||user.bloodGroup === "A+" ||user.bloodGroup === "B-" || user.bloodGroup === "B-")
                                )return <DataList user={user} ind={ind} key={ind} handleOpenDialog={this.handleOpenDialog}/>



                }
                // else {
                //   console.log("blood gt Extrta")
                //   return(
                //     <li className="flex-item" key={ind} onClick={()=>this.handleOpenDialog(ind)}>

                //         <div className='imgdiv'>
                //           <svg className="img" viewBox="0 0 24 24">
                //             <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z">
                //             </path>
                //           </svg>
                //         </div>
                //               <div className="userDetail" >
                //               <span>Doner: {user.username}</span>
                //                 <br/>
                //               <span>Blood Group: {user.bloodGroup}</span>
                //                 <br/>
                //               <span>Gender: {user.gender}</span>
                //             </div>
                //         </li>

                //     )
                // }
              } else {
                // console.log("blood gt Extrta")
                return <DataList user={user} ind={ind} key={ind} handleOpenDialog={this.handleOpenDialog}/>
              }
            }
              

                      


                    
        )}





          {/* <li className="flex-item">
              <div className='imgdiv'>
              <svg viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z">
                </path>
              </svg>

              </div>
              </li>
            <li className="flex-item">3</li>
            <li className="flex-item">4</li>
            <li className="flex-item">5</li>
            <li className="flex-item">6</li>
            <li className="flex-item">6</li>
            <li className="flex-item">6</li> */}
        </ul>

      </div>
    );
  }
}