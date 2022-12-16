import {createStore, combineReducers, applyMiddleware} from "redux";
import ThunkMiddleware from "redux-thunk"
import CommonReducer from "./reducers/CommonReducer";
import {composeWithDevTools} from "redux-devtools-extension"

const rootReducer = combineReducers({
    CommonReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ThunkMiddleware)))