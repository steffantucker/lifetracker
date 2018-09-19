import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Dashboard from "./components/Dashboard";
import Now from "./components/Now";
import Have from "./components/Have";
import What from "./components/What";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/now" component={Now} />
          <Route path="/have" component={Have} />
          <Route path="/what" component={What} />
        </Switch>
      </div>
    );
  }
}

export default App;
