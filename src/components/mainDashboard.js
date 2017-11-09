import React from 'react';
// import Header from './header'
import DashboardList from './dashboardList'
import SignInForm from './signInForm'


import * as firebase from 'firebase'
import "../config/firebase"

export default class MainDashBoard extends React.Component{
    constructor(){
        super()
       
    }

    render(){
        return(
            <div>
                <DashboardList/>
            </div>
        );
    }

}