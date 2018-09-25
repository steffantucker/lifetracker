import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { IconButton, Tooltip, Snackbar } from "@material-ui/core";
import {
  PlayArrowRounded,
  DeleteRounded,
  CloseRounded
} from "@material-ui/icons";

import { startTimer } from "../../../redux/timers";

class Activity extends Component {
  state = {
    open: false,
    message: ""
  };

  handleClose = (e, reason) => {
    if (reason === "clickaway") return;
    this.setState({ open: false });
  };

  startAction = () => {
    this.setState({ open: true, message: `${this.props.title} started` });
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
            <IconButton size="small" onClick={this.startAction}>
              <PlayArrowRounded />
            </IconButton>
          </Tooltip>
          <Tooltip title="delete activity">
            <IconButton
              size="small"
              onClick={() => this.props.delete(this.props._id)}
            >
              <DeleteRounded />
            </IconButton>
          </Tooltip>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{this.state.message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseRounded />
            </IconButton>
          ]}
        />
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
