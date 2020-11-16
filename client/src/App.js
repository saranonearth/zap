import React, { Component } from "react";
import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
   box-sizing:border-box;
   padding:0;
   margin:0;
   
  }

  body{
    background-color:#F2E3FF;
    font-family: 'Lato', sans-serif;
  }
`;
class App extends Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
        </Router>
      </>
    );
  }
}

export default App;
