import {createStore, combineReducers, applyMiddleware} from "redux";
import ThunkMiddleware from "redux-thunk"
import QueueCommonReducer from "./reducers/queueCommonReducer";


const rootReducer = combineReducers({
    QueueCommonReducer,
})

export const store = createStore(rootReducer, applyMiddleware(ThunkMiddleware))