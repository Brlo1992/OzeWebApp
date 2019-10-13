import React, { Component } from 'react';
import './App.css';
import Measurements from './Components/Measurement/Dashboard'
import Devices from "./Components/Devices/Dashboard";
import Settings from "./Components/Settings/Main";
import Landing from  "./Components/Landing/Dashboard";
import Forecast from  "./Components/Forecast/Dashboard";
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

export default class App extends Component {
    render() {
        return <Router>
            <div>
                <Route exact path="/" component={Landing} />
                <Route path="/devices" component={Devices} />
                <Route path="/forecasts" component={Forecast} />
                <Route path="/measurements/:id/:name" component={Measurements} />
                <Route path="/settings/:id" component={Settings} />
            </div>
        </Router>
    }
}


