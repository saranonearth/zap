import React, { Component } from "react";
import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";
import { Route, BrowserRouter as Router } from "react-router-dom";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
      </Router>
    );
  }
}

export default App;
