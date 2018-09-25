import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Nav extends Component {
  state = {
    loc: "home",
    prefix: "",
    postfix: ""
  };

  mouseEnter = which => {
    switch (which) {
      case "now":
        this.setState({ prefix: "I am", postfix: "doing" });
        break;
      case "have":
        this.setState({ prefix: "I", postfix: "done" });
        break;
      case "what":
        this.setState({ prefix: "", postfix: "I do" });
        break;
      default:
    }
  };

  mouseLeave = () => {
    this.setState({ prefix: "", postfix: "" });
  };

  render() {
    return (
      <nav className="nav">
        <Link to="/">
          <img
            className="logo"
            src="http://placekitten.com/200/200"
            alt="logo"
          />
        </Link>
        <span className="prepost prefix">{this.state.prefix}</span>
        <span className="brackets">[</span>
        <span className="links">
          <Link
            className="link"
            to="/now"
            onMouseEnter={() => this.mouseEnter("now")}
            onMouseLeave={this.mouseLeave}
          >
            Now
          </Link>
          <Link
            className="link"
            to="/have"
            onMouseEnter={() => this.mouseEnter("have")}
            onMouseLeave={this.mouseLeave}
          >
            Have
          </Link>
          <Link
            className="link"
            to="/what"
            onMouseEnter={() => this.mouseEnter("what")}
            onMouseLeave={this.mouseLeave}
          >
            What
          </Link>
        </span>
        <span className="brackets">]</span>
        <span className="prepost postfix">{this.state.postfix}</span>
      </nav>
    );
  }
}
