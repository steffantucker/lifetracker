import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { IconButton, Tooltip } from "@material-ui/core";
import { PlayArrowRounded, DeleteRounded } from "@material-ui/icons";

import { startTimer } from "../../../redux/timers";

class Activity extends Component {
  constructor(props) {
    super(props);

    this.classes = this.props.classes;
  }

  startAction = () => {
    this.props.startTimer(this.props._id);
  };

  render() {
    return (
      <div className="activityContainer">
        <div className="activityTitle">
          <span>{this.props.title}</span>
          <span>{this.props.description}</span>
        </div>
        <div className="activityActions">
          <Tooltip title="start action">
            <IconButton size="small">
              <PlayArrowRounded />
            </IconButton>
          </Tooltip>
          <Tooltip title="delete activity">
            <IconButton
              size="small"
              onClick={() => this.props.delete(this.props.id)}
            >
              <DeleteRounded />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    );
  }
}

Activity.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  delete: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired
};

export default connect(
  null,
  { startTimer }
)(Activity);
