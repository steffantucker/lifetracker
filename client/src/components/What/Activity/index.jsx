import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  withStyles
} from "@material-ui/core";
import { PlayArrowRounded, DeleteRounded } from "@material-ui/icons";

const styles = {
  card: {
    width: "100%",
    height: "100%"
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
        <Grid
          container
          justify="space-between"
          direction="column"
          className={this.classes.card}
        >
          <Grid item>
            <CardContent>
              <Typography variant="headline">{this.props.title}</Typography>
              <Typography component="p">{this.props.description}</Typography>
            </CardContent>
          </Grid>
          <Grid item>
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
          </Grid>
        </Grid>
      </Card>
    );
  }
}

Activity.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Activity);
