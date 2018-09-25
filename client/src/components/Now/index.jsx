import React, { Component } from "react";
import { connect } from "react-redux";
import {
  InputLabel,
  Button,
  Select,
  MenuItem,
  FormControl,
  TextField
} from "@material-ui/core";

import InfoRow from "../InfoRow";
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

  start = e => {
    e.preventDefault();
    this.props.startTimer(this.state.activity, this.state.description);
    this.setState({ activity: "", description: "" });
  };

  render() {
    return (
      <main className="nowContainer">
        <form className="nowForm">
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
            <Button variant="contained" onClick={this.start}>
              Start
            </Button>
          </FormControl>
        </form>
        <div className="nowCards">
          {this.props.actions &&
            this.props.actions.map(action => {
              return <InfoRow key={action._id} {...action} stop={this.stop} />;
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
