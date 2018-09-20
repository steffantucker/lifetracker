import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardActions,
  Grid,
  Button,
  Typography,
  withStyles
} from "@material-ui/core";

export default class Have extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actions: [],
      activities: []
    };
  }

  componentDidMount() {
    axios
      .get("/history")
      .then(res => this.setState({ actions: res.data }))
      .catch(err => console.error(err));
    axios
      .get("/activities")
      .then(res => this.setState({ activities: res.data }))
      .catch(err => console.error(err));
  }

  render() {
    console.log(this.state);
    return <div />;
  }
}
