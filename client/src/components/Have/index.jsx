import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { Typography, withStyles } from "@material-ui/core";

import NestedExpansions from "../NestedExpansions";
import NestedExpansionChild from "../NestedExpansions/NestedExpansionChild";
import {init} from "../../redux"

const styles = {
  cards: {
    width: "100%"
  }
};

class Have extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actions: [],
      sortedKeys: []
    };

    this.classes = this.props.classes;
  }

  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        {this.props.actions &&
          this.props.sortedKeys.map(key => {
            return (
              <NestedExpansions
                key={key}
                summary={() => (
                  <Typography variant="headline">
                    {moment(key).format("ll")}
                  </Typography>
                )}
              >
                {this.props.actions[key].map(v => {
                  const start = moment(v.startTime),
                    end = moment(v.endTime);
                  const format =
                    start.dayOfYear() === end.dayOfYear() ? "LT" : "lll";
                  return (
                    <NestedExpansionChild
                      key={v._id}
                      summary={() => (
                        <Typography>
                          <Typography variant="headline">
                            {v.activityId.title}
                          </Typography>{" "}
                          {start.format(format)} - {end.format(format)}
                          {" :  "}
                          {moment.duration(end.diff(start)).humanize()}
                        </Typography>
                      )}
                    >
                      <Typography>{v.description}</Typography>
                    </NestedExpansionChild>
                  );
                })}
              </NestedExpansions>
            );
          })}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(
  connect(
    state => ({
      actions: state.actions,
      isLoaded: state.isActionsLoaded,
      sortedKeys: state.sortedKeys
    }),
    { init }
  )(Have)
);
