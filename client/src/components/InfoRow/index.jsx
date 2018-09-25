import React, { Component } from "react";
import moment from "moment";
import { IconButton } from "@material-ui/core";
import { StopRounded } from "@material-ui/icons";

export default class InfoRow extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);

    this.startTime = moment(this.props.startTime);
    this.endTime = this.props.endTime ? moment(this.props.endTime) : moment();
    this.state = {
      intervalId: this.props.endTime
        ? null
        : setInterval(this.updateDuration, 30000),
      duration: moment.duration(this.endTime.diff(this.startTime)).humanize()
    };
  }

  componentWillUnmount() {
    if (this.state.intervalId) clearInterval(this.state.intervalId);
  }

  updateDuration = () => {
    this.endTime = moment();
    this.setState({
      duration: moment.duration(this.endTime.diff(this.startTime)).humanize()
    });
  };

  render() {
    const format =
      this.startTime.dayOfYear() === this.endTime.dayOfYear() ? "LT" : "lll";
    return (
      <div className="actionCard">
        <span className="actionTitle">
          {this.props.activityId.title !== null
            ? this.props.activityId.title
            : ""}{" "}
          <span className="actionDuration">({this.state.duration})</span>
        </span>
        <span className="actionDescription">{this.props.description}</span>
        <span className="actionTimes">
          {this.startTime.format(format)}{" "}
          {this.props.endTime && ` - ${this.endTime.format(format)}`}
        </span>
        {this.props.stop && (
          <span className="actionActions">
            <IconButton
              size="medium"
              onClick={() => this.props.stop(this.props._id)}
            >
              <StopRounded />
            </IconButton>
          </span>
        )}
      </div>
    );
  }
}
