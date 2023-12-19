import { combineReducers } from "redux";
import { searchToggleReducer } from "./searchToggle";

const reducers = combineReducers({
    searchToggle: searchToggleReducer,
})

export default reducers