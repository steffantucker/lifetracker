import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, TextField, FormControl } from "@material-ui/core";

import Activity from "./Activity";
import { init } from "../../redux/common";
import { deleteActivity, addActivity } from "../../redux/activities";

class What extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: ""
    };
  }

  componentDidMount() {
    if (!this.props.isLoaded) this.props.init();
  }

  render() {
    return (
      <main className="whatContainer">
        <form className="whatForm">
          <FormControl>
            <TextField
              id="activityTitle"
              name="title"
              label="Name"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <TextField
              id="activityDescription"
              name="description"
              label="Default description"
              value={this.state.description}
              onChange={this.handleChange}
              multiline
              rows="1"
            />
            <Button variant="contained" onClick={this.handleSubmit}>
              Add activity
            </Button>
          </FormControl>
        </form>
        <div className="whatCards">
          {this.props.activities.map(activity => (
            <Activity
              key={activity._id}
              {...activity}
              type="activity"
              delete={this.deleteActivity}
            />
          ))}
        </div>
      </main>
    );
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    const { title, description } = this.state;
    this.props.addActivity(title, description);
  };

  deleteActivity = id => this.props.deleteActivity(id);
}

What.propTypes = {
  init: PropTypes.func.isRequired,
  deleteActivity: PropTypes.func.isRequired,
  activities: PropTypes.array.isRequired,
  isLoaded: PropTypes.bool.isRequired
};

export default connect(
  state => ({
    activities: state.activities,
    isLoaded: state.isActivitiesLoaded
  }),
  { init, deleteActivity, addActivity }
)(What);
