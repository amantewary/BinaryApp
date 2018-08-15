import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./components/reducers";

const middleware = [thunk];
const initialState = {};

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    //!Uncomment this while debugging. (Chrome REDUX Dev Tool is required)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
