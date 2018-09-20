import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
  withStyles
} from "@material-ui/core";
import { PlayArrowRounded, DeleteRounded } from "@material-ui/icons";

const styles = {
  card: {
    minHeight: 200,
    minWidth: 150
  }
};

class Activity extends Component {
  constructor(props) {
    super(props);

    this.classes = this.props.classes;
  }
  startAction = () => {
    // TODO: modal to get action title, then start action
    // use snackbox to show action started
  };
  render() {
    return (
      <Card className={this.classes.card}>
        <CardContent>
          <Typography variant="headline">{this.props.title}</Typography>
          <Typography component="p">{this.props.description}</Typography>
        </CardContent>
        <CardActions>
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
        </CardActions>
      </Card>
    );
  }
}

Activity.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Activity);
