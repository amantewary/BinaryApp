import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReduce";
import authReducer from "./authReducer";
import postReducer from "./postReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer
});
