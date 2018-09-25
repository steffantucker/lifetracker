import React, { Component } from "react";
import { connect } from "react-redux";
import {
  InputLabel,
  Button,
  Select,
  MenuItem,
<<<<<<< HEAD
  FormControl,
  TextField
} from "@material-ui/core";
=======
  TextField,
  Typography,
  withStyles
} from "@material-ui/core";
import {
  StopRounded,
  RefreshRounded,
  ExpandMoreRounded
} from "@material-ui/icons";
>>>>>>> master

import InfoRow from "../InfoRow";
import { init } from "../../redux/common";
import { stopTimer, startTimer } from "../../redux/timers";

class Now extends Component {
  constructor(props) {
    super(props);

    this.state = {
<<<<<<< HEAD
=======
      actions: [],
      activities: [],
>>>>>>> master
      activity: "",
      description: ""
    };
  }

  componentDidMount() {
<<<<<<< HEAD
    if (!this.props.actionsLoaded || !this.props.activitesLoaded)
      this.props.init();
  }

  stop = id => {
    this.props.stopTimer(id);
=======
    console.log("mounted");
    this.refresh();
  }

  refresh = () => {
    console.log("refreshing");
    axios
      .get("/timers")
      .then(res => this.setState({ actions: res.data }))
      .catch(err => console.error(err));
    axios
      .get("/activities")
      .then(res => this.setState({ activities: res.data }))
      .catch(err => console.error(err));
  };

  stop = id => {
    axios.get(`/timers/end/${id}`).then(res =>
      this.setState(prev => ({
        actions: prev.actions.filter(v => v._id !== id)
      }))
    );
>>>>>>> master
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

<<<<<<< HEAD
  start = e => {
    e.preventDefault();
    this.props.startTimer(this.state.activity, this.state.description);
    this.setState({ activity: "", description: "" });
=======
  handleSubmit = e => {
    const body = { activityId: this.state.activity };
    if (this.state.description !== "")
      body.description = this.state.description;
    else
      body.description = this.state.activities.find(
        v => v._id === body.activityId
      ).description;
    axios.post(`/timers/start`, body).then(res => {
      console.log(res);
      this.setState(prev => ({
        actions: [...prev.actions, res.data],
        activity: "",
        description: ""
      })).catch(err => console.log(err));
    });
>>>>>>> master
  };

  render() {
    console.log(this.state);
    return (
<<<<<<< HEAD
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
=======
      <div>
        <IconButton onClick={this.refresh} size="medium">
          <RefreshRounded />
        </IconButton>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreRounded />}>
            <FormControl>
              <InputLabel htmlFor="activity">New Activity</InputLabel>
              <Select
                value={this.state.activity}
                onChange={this.handleChange}
                inputProps={{ name: "activity", id: "activity" }}
                className={this.classes.select}
              >
                <MenuItem value="">
                  <em>Choose one</em>
                </MenuItem>
                {this.state.activities.map(v => (
                  <MenuItem key={v._id} value={v._id}>
                    {v.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button onClick={this.handleSubmit}>Start</Button>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <TextField
              id="description"
              name="description"
              label="Description"
              value={this.state.description}
              onChange={this.handleChange}
              multiline
              rows={2}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        {this.state.actions &&
          this.state.actions.map(action => {
            return (
              <ExpansionPanel key={action._id}>
                <ExpansionPanelSummary>
                  <Grid container justify="space-between">
                    <Grid item>
                      {moment(action.startTime).format("lll")} -{" "}
                      {action.activityId.title}
                    </Grid>
                    <Grid item>
                      <IconButton
                        size="medium"
                        onClick={() => this.stop(action._id)}
                      >
                        <StopRounded />
                      </IconButton>
                    </Grid>
                  </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>{action.description}</Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          })}
      </div>
>>>>>>> master
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
