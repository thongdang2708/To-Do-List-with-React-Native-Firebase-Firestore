
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { todoReducers } from "./reducers";
const middleware = [thunk];
const reducers = combineReducers({
    todo: todoReducers
});

const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middleware)));

export default store;