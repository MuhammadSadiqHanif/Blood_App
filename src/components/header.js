import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
// import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Menu from 'material-ui/svg-icons/navigation/menu'
import { connect } from "react-redux"
import StoreAction from '../store/actions/action';
import Logged from './logged'
import Dialog from 'material-ui/Dialog';
// import FlatButton from 'material-ui/FlatButton';

import * as firebase from "firebase"

import Drawer from 'material-ui/Drawer';
import {
    Link
} from "react-router-dom"


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

      loggedOut: () => {
        
        dispatch({type: StoreAction.loggedOut()})
        
       } 
      }
}



// const signOut=()=>{
//   this.props.loggedOut()
//   // firebase.auth().signOut();
//   alert("sign out done")

// }

class DialogBox extends React.Component{
  state = {
    open: false,
    users : this.props.state.users,
    ind : this.props.state.ind,
    bloodGroup:"",
    disease:"",
    dob:"",
    email:"",
    gender:"",
    username:""
  };

  // componentWillMount(){
  //   // console.log(this.state.users)
  //   let ind = this.state.ind
  //   this.setState({
  //     bloodGroup:this.state.users[ind].bloodGroup,
  //     username : this.state.users[ind].username,
  //     email:this.state.users[ind].email,
  //     gender:this.state.users[ind].gender,
  //     dob:this.state.users[ind].dob,
  //     disease:this.state.users[ind].disease,

  //   })
  // }



  render(){

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

    return(
      <Dialog
      title="Donar's Detail"
      actions={actions}
      modal={false}
      open={true}
      onRequestClose={this.handleClose}
    >
      The actions in this window were passed in as an array of React objects.
      {/* <table >
        <tbody>
        <tr><th> Donar Name :</th><th>{(this.state.username).toUpperCase()}</th></tr>
        <tr><th> Email Address :</th><td>{this.state.email}</td></tr>
        <tr><th> Gender :</th><td>{this.state.gender}</td></tr>
        <tr><th> Blood Group :</th><td>{this.state.bloodGroup}</td></tr>
        <tr><th> Date Of Birth :</th><td>{this.state.dob}</td></tr>
        <tr><th> Disease :</th><td>{this.state.disease}</td></tr>

        </tbody>
      </table> */}
     
      
      </Dialog>
    )

  }
}















class Login extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
      <Link to="/signInForm"> <FlatButton {...this.props} label="Login" /> </Link>
    );
  }
}



// const Logged = (props) => (

//     <IconMenu
//       {...props}
//       iconButtonElement={
//         <IconButton><MoreVertIcon /></IconButton>
//       }
//       targetOrigin={{horizontal: 'right', vertical: 'top'}}
//       anchorOrigin={{horizontal: 'right', vertical: 'top'}}
//     >
//       <MenuItem primaryText="Refresh" />
//       <MenuItem primaryText="Help" />
//       <MenuItem primaryText="Sign Out" onClick={()=>signOut()}  />
//     </IconMenu>

  
    
// );

// class Logged extends Component {
//   static muiName = "IconMenu"


//   render(){
//     return(
//       <IconMenu
//         /* {...props} */
//         iconButtonElement={
//           <IconButton><MoreVertIcon /></IconButton>
//         }
//         targetOrigin={{horizontal: 'right', vertical: 'top'}}
//         anchorOrigin={{horizontal: 'right', vertical: 'top'}}
//       >
//         <MenuItem primaryText="Refresh" />
//         <MenuItem primaryText="Help" />
//         <MenuItem primaryText="Sign Out" onClick={()=>signOut()}  />
//       </IconMenu>

//     )
//   }
  
    
      
// };
// onClick={()=>signOut()

Logged.muiName = 'IconMenu';


/**
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */
class Header extends Component {
  state = {
    // logged: this.props.log,

    open: false,
    dialog:false
  };
  
  handleToggle = () => this.setState({open: !this.state.open});
  handleClose = () => this.setState({open: false});


  handleClickHome=()=>{
    this.setState({open: false}) 
    // this.history.push("/mainDashboard");
    // this.props.history.push('/signup')
  }
  handleClickDonateBlood=()=>{



    this.setState({open: false,
          dialog:true
    })


  }


  handleCloseDialog = () => {
    this.setState({dialog: false});
  };
  handleOpenDialog = (ind) => {
    this.setState({dialog: true,
                  ind:ind
      });
    
  };

 
  


  // handleChange = (event, logged) => {
  //   this.setState({logged: logged});


  // };

  render() {
    return (
      <div>
        {/* <Toggle
          label="Logged"
          defaultToggled={true}
          onToggle={this.handleChange}
          labelPosition="right"
          style={{margin: 20}}
          
          
        /> */}
              {this.props.loginType
              ?
              null
              :
                  this.state.dialog
                  ?
                  <DialogBox handleCloseDialog={this.handleCloseDialog} state={this.state}  handleOpenDialog={this.handleOpenDialog}/>
                  :
                  null
            }
        
        <AppBar
          title="Blood Applcation"
          iconElementLeft={<IconButton><Menu onClick={this.handleToggle} /></IconButton>}
      iconElementRight={this.props.loginType ? (<Logged signOut={this.props.signOut}/>) : <Login/>}
          className='appbar'
        />
        
        
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          className="drawer"
          onRequestChange={(open) => this.setState({open})}
        >
          <Link to="/" > <MenuItem onClick={this.handleClose}>Home</MenuItem></Link>
          <MenuItem onClick={this.handleClickDonateBlood}>Donate Blood</MenuItem>
          <MenuItem onClick={this.handleClose}>Need Blood</MenuItem>
        </Drawer>


      </div>
    );
  }
}

export default  connect(mapStateToProps,mapDispatchToProps)(Header);