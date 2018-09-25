import { loadTimers } from "../timers";
import { loadActions } from "../actions";
import { loadActivities } from "../activities";

export const init = () => {
  return function(dispatch) {
    loadTimers(dispatch);
    loadActions(dispatch);
    loadActivities(dispatch);
  };
};
