import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import {
  Button,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  withStyles
} from "@material-ui/core";
import { StopRounded } from "@material-ui/icons";

const styles = {
  select: {
    minWidth: 300
  }
};

class Now extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actions: [],
      activities: [],
      activity: ""
    };
    this.classes = props.classes;
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

  stop = id =>
    axios.get(`/timers/end/${id}`).then(res =>
      this.setState(prev => ({
        actions: prev.actions.filter(v => v._id !== id)
      }))
    );

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    axios
      .post(`/timers/start`, { activityId: this.state.activity })
      .then(res =>
        this.setState(prev => ({
          actions: [...prev.actions, res.data],
          activity: ""
        })).catch(err => console.log(err))
      );
  };

  render() {
    return (
      <div>
        <ExpansionPanel>
          <ExpansionPanelSummary>
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
                  <MenuItem value={v._id}>{v.title}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button onClick={this.handleSubmit}>Start</Button>
          </ExpansionPanelSummary>
        </ExpansionPanel>
        {this.state.actions.map(action => {
          return (
            <ExpansionPanel item>
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
    );
  }
}

export default withStyles(styles)(Now);
