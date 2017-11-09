import { applyMiddleware, createStore } from 'redux';
import { createLogger } from "redux-logger";
// import { createLogger } from "redux-logger";s

import thunk from "redux-thunk";
import { combineReducers } from "redux"
import  decrementCounter  from './reducers/decrementReducer'
import incrementCounter  from './reducers/incrementReducer'
import loggedStatus  from './reducers/mixReducers'



export const rootReducer = combineReducers({
    incrementCounter,
    decrementCounter,
    loggedStatus
})


// const middleware = applyMiddleware(thunk, createLogger());
let store = createStore(rootReducer);

// store.subscribe(() => {
//   console.log(store.getState())
// })


export default store;