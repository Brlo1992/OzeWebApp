import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Measurements from './Components/Measurement/Dashboard'
import Devices from "./Components/Devices/Dashboard";
import Settings from "./Components/Settings/Main";
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

export default class App extends Component {
    render() {
        return <Router>
            <div>
                <Route exact path="/" component={Devices} />
                <Route exact path="/measurements/:id/:name" component={Measurements} />
                <Route exact path="/settings/:id" component={Settings} />
                {/* <Route path="/" component={Devices} />
                <Route path="/" component={Devices} /> */}
            </div>
        </Router>
    }
}


