import axios from "axios";

export const startTimer = (activityId, description) => {
  return function(dispatch) {
    axios
      .post(`/timers/start`, { activityId, description })
      .then(res => {
        dispatch({ type: "START_TIMER", data: res.data });
      })
      .catch(err => console.error(err));
  };
};

export const stopTimer = id => {
  return function(dispatch) {
    axios
      .get(`/timers/end/${id}`)
      .then(res => dispatch({ type: "END_TIMER", id }))
      .catch(err => console.error(err));
  };
};

export const loadTimers = dispatch => {
  axios
    .get("/timers")
    .then(res => {
      dispatch({ type: "TIMERS_LOADED" });
      dispatch({ type: "INIT_TIMERS", data: res.data });
    })
    .catch(err => console.error(err));
};

export const timers = (prev = [], action) => {
  switch (action.type) {
    case "INIT_TIMERS":
      return action.data;
    case "START_TIMER":
      return [...prev, action.data];
    case "END_TIMER":
      return prev.filter(v => v._id !== action.id);
    default:
      return prev;
  }
};

export const isTimersLoaded = (prev = false, action) => {
  switch (action.type) {
    case "TIMERS_LOADED":
      return true;
    default:
      return prev;
  }
};
