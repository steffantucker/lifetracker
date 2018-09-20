import React, { Component } from "react";
import axios from "axios";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  IconButton,
  Typography
} from "@material-ui/core";
import { StopRounded } from "@material-ui/icons";

export default class Now extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actions: [],
      activities: []
    };
  }

  componentDidMount() {
    axios
      .get("/timers")
      .then(res => this.setState({ actions: res.data }))
      .catch(err => console.error(err));
    axios
      .get("/activities")
      .then(res => this.setState({ activities: res.data }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <ExpansionPanel>
          <ExpansionPanelSummary>{/*drop down of activities */}</ExpansionPanelSummary>
        </ExpansionPanel>
        {this.state.actions.map(action => (
          <ExpansionPanel item>
            <ExpansionPanelSummary>
              {action.startTime} - {action.activityId}{" "}
              <IconButton>
                <StopRounded />
              </IconButton>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>{action.description}</Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
    );
  }
}
