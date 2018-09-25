import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";

import { init } from "../../redux/common";
import InfoRow from "../InfoRow";

class Have extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actions: [],
      sortedKeys: []
    };
  }

  componentDidMount() {
    if (!this.props.isLoaded) this.props.init();
  }

  render() {
    return (
      <main className="haveContainer">
        {this.props.actions &&
          this.props.sortedKeys.map(key => {
            return (
              <div className="dateContainer" key={key}>
                <span>{moment(key).format("ll")}</span>
                {this.props.actions[key].map(v => (
                  <InfoRow key={v._id} {...v} />
                ))}
              </div>
            );
          })}
      </main>
    );
  }
}

export default connect(
  state => ({
    actions: state.actions,
    isLoaded: state.isActionsLoaded,
    sortedKeys: state.sortedKeys
  }),
  { init }
)(Have);
