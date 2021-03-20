import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { birdsReducer } from "./birdRedux/reducer";
import { searchReducer } from "./Search/reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  birds: birdsReducer,
  search: searchReducer
});

export const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk)),
);
