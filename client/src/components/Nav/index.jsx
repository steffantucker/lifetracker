import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Nav extends Component {
  state = {
    loc: "home"
  };

  render() {
    return (
      <div className="nav">
        <Link to="/">
          <img
            className="logo"
            src="http://placekitten.com/200/200"
            alt="logo"
          />
        </Link>
        <span className="prepost">I am/have</span>
        <span className="brackets">[</span>
        <span className="links">
          <Link className="link" to="/now">
            Now
          </Link>
          <Link className="link" to="/have">
            Have
          </Link>
          <Link className="link" to="/what">
            What
          </Link>
        </span>
        <span className="brackets">]</span>
        <span className="prepost">Doing/Done</span>
      </div>
    );
  }
}
