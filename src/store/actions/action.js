import ActionTypes from './actionTypes';

// class StoreAction {

//     static increment() {
//         return ActionTypes.INCREMENT
//     }

//     static decrement() {
//         return ActionTypes.DECREMENT
//     }
// }

const StoreAction = {
    increment: function () {
        return ActionTypes.INCREMENT
    }, 
    decrement: function () {
        return ActionTypes.DECREMENT
    },
    loggedIn : function() {
        return ActionTypes.LOGGEDIN
    },
    loggedOut : function() {
        console.log("ho raha hahi")
        return {
            type: ActionTypes.LOGGEDOUT,
            // payload: true
        }
    }
}
export default StoreAction 