import ActionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
    loggedStatusValue: false
}

function loggedStatus(state = INITIAL_STATE, action) {

  switch (action.type) {
    case ActionTypes.LOGGEDIN: {
        // var logged = Object,assign({},state,{})
    //   var newState = Object.assign({},state,{decrementStateValue:state.decrementStateValue - action.val})
      var newState = Object.assign({},state,{loggedStatusValue:true})
    // payload : true 
      return state.loggedStatusValue
    }
    case ActionTypes.LOGGEDOUT: {
        // var logged = Object,assign({},state,{})
    //   var newState = Object.assign({},state,{decrementStateValue:state.decrementStateValue - action.val})
    var newState = Object.assign({},state,{loggedStatusValue:false})
    
    //  payload : false 
      return newState
    }
    default: return state;
  }
}

export default loggedStatus;