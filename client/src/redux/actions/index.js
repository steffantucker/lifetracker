import axios from "axios";
import moment from "moment";

export const loadActions = dispatch => {
  axios
    .get("/history?sort=date")
    .then(res => {
      dispatch({ type: "ACTIONS_LOADED" });
      dispatch({ type: "INIT_ACTIONS", data: res.data.actions });
    })
    .catch(err => console.error(err));
};

export const isActionsLoaded = (prev = false, action) => {
  switch (action.type) {
    case "ACTIONS_LOADED":
      return true;
    default:
      return prev;
  }
};

export const actions = (prev = [], action) => {
  switch (action.type) {
    case "INIT_ACTIONS":
      return action.data;
    default:
      return prev;
  }
};

export const sortedKeys = (prev = [], action) => {
  switch (action.type) {
    case "INIT_ACTIONS":
      const sortedKeys = Object.keys(action.data).sort((a, b) => {
        const dateA = moment(a),
          dateB = moment(b);
        if (dateA.year() > dateB.year()) return -1;
        else if (dateA.year() < dateB.year()) return 1;
        if (dateA.dayOfYear() > dateB.dayOfYear()) return -1;
        else if (dateA.dayOfYear() < dateB.dayOfYear()) return 1;
        return 0;
      });
      return sortedKeys;
    default:
      return prev;
  }
};
