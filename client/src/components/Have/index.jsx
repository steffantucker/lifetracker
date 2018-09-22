import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import { Typography, withStyles } from "@material-ui/core";

import NestedExpansions from "../NestedExpansions";
import NestedExpansionChild from "../NestedExpansions/NestedExpansionChild";

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

  componentDidMount() {
    axios
      .get("/history?sort=date")
      .then(res => {
        const sortedKeys = Object.keys(res.data.actions).sort((a, b) => {
          const dateA = moment(a),
            dateB = moment(b);
          if (dateA.year() > dateB.year()) return -1;
          else if (dateA.year() < dateB.year()) return 1;
          if (dateA.dayOfYear() > dateB.dayOfYear()) return -1;
          else if (dateA.dayOfYear() < dateB.dayOfYear()) return 1;
          return 0;
        });
        this.setState({ actions: res.data.actions, sortedKeys });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <React.Fragment>
        {this.state.actions &&
          this.state.sortedKeys.map(key => {
            return (
              <NestedExpansions
                key={key}
                summary={() => (
                  <Typography variant="headline">
                    {moment(key).format("ll")}
                  </Typography>
                )}
              >
                {this.state.actions[key].map(v => {
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

export default withStyles(styles)(Have);
