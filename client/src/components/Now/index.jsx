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
  TextField,
  Typography,
  withStyles
} from "@material-ui/core";
import {
  StopRounded,
  RefreshRounded,
  ExpandMoreRounded
} from "@material-ui/icons";

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
      activity: "",
      description: ""
    };
    this.classes = props.classes;
  }

  componentDidMount() {
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
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

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
  };

  render() {
    console.log(this.state);
    return (
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
    );
  }
}

export default withStyles(styles)(Now);
