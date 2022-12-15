import {createStore, combineReducers, applyMiddleware} from "redux";
import ThunkMiddleware from "redux-thunk"
import QueueCommonReducer from "./reducers/queueCommonReducer";
import {composeWithDevTools} from "redux-devtools-extension"

const rootReducer = combineReducers({
    QueueCommonReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ThunkMiddleware)))