import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import { Provider } from "react-redux"
import store from './store/store';
import Container from './container/container';


ReactDOM.render(<Provider store ={store}><MuiThemeProvider><App /></MuiThemeProvider></Provider>, document.getElementById('root'));
registerServiceWorker();
