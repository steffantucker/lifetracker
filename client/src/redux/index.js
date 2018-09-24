import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import moment from "moment";

const initState = {
  isTimersLoaded: false,
  isActionsLoaded: false,
  isActivitiesLoaded: false,
  timers: [],
  actions: [],
  activities: [],
  sortedKeys: []
};

export const init = () => {
  return function(dispatch) {
    loadTimers(dispatch);
    loadActions(dispatch);
    loadActivities(dispatch);
  };
};

const loadTimers = dispatch => {
  axios
    .get("/timers")
    .then(res => {
      dispatch({ type: "TIMERS_LOADED" });
      dispatch({ type: "INIT_TIMERS", data: res.data });
    })
    .catch(err => console.error(err));
};
const loadActions = dispatch => {
  axios
    .get("/history?sort=date")
    .then(res => {
      dispatch({ type: "ACTIONS_LOADED" });
      dispatch({ type: "INIT_ACTIONS", data: res.data.actions });
    })
    .catch(err => console.error(err));
};
const loadActivities = dispatch => {
  axios
    .get("/activities")
    .then(res => {
      dispatch({ type: "ACTIVITIES_LOADED" });
      dispatch({ type: "INIT_ACTIVITIES", data: res.data });
    })
    .catch(err => console.error(err));
};

const timerReducer = (prev = [], action) => {
  switch (action.type) {
    case "INIT_TIMERS":
      return action.data;
    default:
      return prev;
  }
};

const actionReducer = (prev = [], action) => {
  switch (action.type) {
    case "INIT_ACTIONS":
      return action.data;
    default:
      return prev;
  }
};

const activityReducer = (prev = [], action) => {
  switch (action.type) {
    case "INIT_ACTIVITIES":
      console.log(`activity ${action.type}`);
      return action.data;
    default:
      return prev;
  }
};

const isTimersLoaded = (prev = false, action) => {
  switch (action.type) {
    case "TIMERS_LOADED":
      return true;
    default:
      return prev;
  }
};

const isActionsLoaded = (prev = false, action) => {
  switch (action.type) {
    case "ACTIONS_LOADED":
      return true;
    default:
      return prev;
  }
};

const isActivitiesLoaded = (prev = false, action) => {
  switch (action.type) {
    case "ACTIVITIES_LOADED":
      return true;
    default:
      return prev;
  }
};

const sortedKeys = (prev = [], action) => {
  console.log(action);
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

const rootReducer = combineReducers({
  isTimersLoaded,
  isActionsLoaded,
  isActivitiesLoaded,
  timers: timerReducer,
  actions: actionReducer,
  activities: activityReducer,
  sortedKeys
});

export default createStore(
  rootReducer,
  initState,
  compose(
    applyMiddleware(thunk),

    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
