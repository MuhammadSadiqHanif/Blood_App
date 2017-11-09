import React ,{Component} from "react";
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import { connect } from 'react-redux';
import StoreAction from '../store/actions/action';
import * as firebase from 'firebase'



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
          
          dispatch(StoreAction.loggedOut())
          
         } 
        }
  }


 


class Logged extends Component {
    static muiName = "IconMenu"
  
    //  signOut=(props)=>{
    //     this.props.loggedOut()
    //     firebase.auth().signOut();
    //     alert("sign out done")
      
    //   }


    render(){
      return(
        <IconMenu
          /* {...props} */
          iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
          }
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem primaryText="Refresh" />
          <MenuItem primaryText="Help" />
          <MenuItem primaryText="Sign Out" onClick={()=>this.props.signOut()}  />
        </IconMenu>
  
      )
    }
    
      
        
  };

  export default connect(mapStateToProps,mapDispatchToProps)(Logged);