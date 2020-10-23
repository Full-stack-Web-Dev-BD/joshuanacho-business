import { combineReducers } from "redux";
import authReducer from "./authReducer";
import messageReducer from "./messageReducer";
import transectionReducer from './transectionReducer'

const rootReducer =combineReducers({
    auth:authReducer,
    message:messageReducer,
    transection:transectionReducer
})

export default rootReducer