import React, { Component } from "react";
import Axios from "axios";

export default class What extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: []
    };
  }

  componentDidMount() {
    Axios.get("/activities")
      .then(res => {
        console.log(res);
        this.setState({ activities: res.data });
      })
      .catch(err => console.error(err));
  }
  render() {
    return (
      <div className="what">
        {this.state.activities.map(activity => (
          <div className="activity">{activity.title}</div>
        ))}
      </div>
    );
  }
}
