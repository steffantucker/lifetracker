import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  Button,
  TextField,
  withStyles
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

import Activity from "./Activity";

const styles = {
  gridItem: {
    width: "100%",
    height: "100%"
  }
};

class What extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      title: "",
      description: ""
    };

    this.classes = props.classes;
  }

  componentDidMount() {
    axios
      .get("/activities")
      .then(res => {
        this.setState({ activities: res.data });
      })
      .catch(err => console.error(err));
  }

  render() {
    console.log(this.state.activities);
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          New Activity
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container direction="column">
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
              rows="2"
            />
          </Grid>
          <Button color="primary" onClick={this.handleSubmit}>
            Add activity
          </Button>
        </ExpansionPanelDetails>

        {/* {this.state.activities.map(activity => (
          <Grid item xs={3} className={this.classes.gridItem}>
            <Activity
              key={activity._id}
              id={activity._id}
              title={activity.title}
              description={activity.description}
              delete={this.deleteActivity}
            />
          </Grid>
        ))} */}
      </ExpansionPanel>
    );
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    const { title, description } = this.state;
    axios
      .post("/activities", { title, description })
      .then(res =>
        this.setState(prev => ({ activities: [...prev.activities, res.data] }))
      )
      .catch(err => console.error(err));
  };

  deleteActivity = id => {
    axios
      .delete(`/activities/${id}`)
      .then(_ =>
        this.setState(prev => ({ activities: prev.filter(a => a._id !== id) }))
      )
      .catch(err => console.error(err));
  };
}

What.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(What);
