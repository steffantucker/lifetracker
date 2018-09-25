import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  InputLabel,
  Button,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  TextField
} from "@material-ui/core";
import { StopRounded } from "@material-ui/icons";

import { init } from "../../redux/common";
import { stopTimer, startTimer } from "../../redux/timers";

class Now extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activity: "",
      description: ""
    };
  }

  componentDidMount() {
    if (!this.props.actionsLoaded || !this.props.activitesLoaded)
      this.props.init();
  }

  stop = id => {
    this.props.stopTimer(id);
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    this.props.startTimer(this.state.activity, this.state.description);
    this.setState({ activity: "", description: "" });
  };

  render() {
    return (
      <main className="nowContainer">
        <form onSubmit={this.handleSubmit} className="nowForm">
          <FormControl>
            <InputLabel htmlFor="activity">New Activity</InputLabel>
            <Select
              value={this.state.activity}
              onChange={this.handleChange}
              name="activity"
              id="activity"
            >
              <MenuItem value="">Choose one</MenuItem>
              {this.props.activities.map(v => (
                <MenuItem key={v._id} value={v._id}>
                  {v.title}
                </MenuItem>
              ))}
            </Select>
            <TextField
              label="Description"
              name="description"
              multiline
              rows={3}
              placeholder="optional"
              onChange={this.handleChange}
              value={this.state.description}
            />
            <Button onClick={this.handleSubmit}>Start</Button>
          </FormControl>
        </form>
        <div className="nowCards">
          {this.props.actions &&
            this.props.actions.map(action => {
              return (
                <div key={action._id} className="card">
                  <div className="cardSummary">
                    <span className="cardHeader">
                      {moment(action.startTime).format("lll")} -{" "}
                      {action.activityId.title} (
                      {moment
                        .duration(moment().diff(moment(action.startTime)))
                        .humanize()}
                      )
                    </span>
                    <IconButton
                      size="medium"
                      onClick={() => this.stop(action._id)}
                    >
                      <StopRounded />
                    </IconButton>
                  </div>
                  <div className="cardDetails">{action.description}</div>
                </div>
              );
            })}
        </div>
      </main>
    );
  }
}

export default connect(
  state => ({
    actionsLoaded: state.isActionsLoaded,
    activitiesLoaded: state.isActivitesLoaded,
    actions: state.timers,
    activities: state.activities
  }),
  { init, stopTimer, startTimer }
)(Now);
