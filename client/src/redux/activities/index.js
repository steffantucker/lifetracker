import axios from "axios";

export const addActivity = (title, description) => {
  return function(dispatch) {
    axios
      .post("/activities", { title, description })
      .then(res =>
        dispatch({
          type: "ADD_ACTIVITY",
          data: res.data
        })
      )
      .catch(err => console.error(err));
  };
};

export const deleteActivity = id => {
  return function(dispatch) {
    axios
      .delete(`/activities/${id}`)
      .then(res => dispatch({ type: "DELETE_ACTIVITY", id }))
      .catch(err => console.error(err));
  };
};
export const loadActivities = dispatch => {
  axios
    .get("/activities")
    .then(res => {
      dispatch({ type: "ACTIVITIES_LOADED" });
      dispatch({ type: "INIT_ACTIVITIES", data: res.data });
    })
    .catch(err => console.error(err));
};

export const activities = (prev = [], action) => {
  switch (action.type) {
    case "INIT_ACTIVITIES":
      return action.data;
    case "ADD_ACTIVITY":
      return [...prev, action.data]
    case "DELETE_ACTIVITY":
      return prev.filter(v => v._id !== action.id);
    default:
      return prev;
  }
};

export const isActivitiesLoaded = (prev = false, action) => {
  switch (action.type) {
    case "ACTIVITIES_LOADED":
      return true;
    default:
      return prev;
  }
};
