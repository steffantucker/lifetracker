import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { isActionsLoaded, actions, sortedKeys } from "./actions";
import { isActivitiesLoaded, activities } from "./activities";
import {isTimersLoaded, timers} from "./timers"

const rootReducer = combineReducers({
  isTimersLoaded,
  isActionsLoaded,
  isActivitiesLoaded,
  timers,
  actions,
  activities,
  sortedKeys
});

export default createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),

    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
