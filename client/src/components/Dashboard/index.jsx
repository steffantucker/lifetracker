import React, { Component } from "react";
import { connect } from "react-redux";

import { init } from "../../redux/common";
import Activity from "../What/Activity";
import moment from "moment";

class Dashboard extends Component {
  componentDidMount() {
    if (
      !this.props.isActionsLoaded ||
      !this.props.isTimersLoaded ||
      !this.props.isActivitiesLoaded
    )
      this.props.init();
  }

  render() {
    return (
      <main className="dashboard">
        <div className="summaryTitle">Now</div>
        <div className="summary">
          {this.props.timers &&
            this.props.timers.map(v => (
              <Activity
                key={v._id}
                title={v.activityId.title}
                description={v.description}
              />
            ))}
        </div>
        <div className="summaryTitle">Have</div>
        <div className="summary">
          {this.props.actions[moment().format("L")] &&
            this.props.actions[moment().format("L")].map(v => (
              <Activity
                key={v._id}
                title={v.activityId.title}
                description={v.description}
              />
            ))}
        </div>
        <div className="summaryTitle">What</div>
        <div className="summary">
          {this.props.activities &&
            this.props.activities.map(v => (
              <Activity key={v._id} {...v} type="activity" />
            ))}
        </div>
      </main>
    );
  }
}

export default connect(
  state => state,
  { init }
)(Dashboard);
