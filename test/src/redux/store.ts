import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { ISelectState, selectReducer } from "./reducers/select";



export interface TState {
  selectReducer: ISelectState;
}
export let store = createStore(
  combineReducers({ selectReducer }),
  composeWithDevTools(applyMiddleware(thunk))
);