import React from 'react';
import ReactDOM from 'react-dom';
// import { HashRouter, Route } from 'react-router-dom';
// import NavBar from './components/NavBar';
import { Provider } from 'react-redux'
import store from './store/store'
import App from './components/App';

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

