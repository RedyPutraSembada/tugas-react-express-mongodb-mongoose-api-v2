import { combineReducers, compose, createStore } from "redux";
// import thunk from "redux-thunk";
import productReducer from "./features/reducer";


let rootReducers = combineReducers({
    dataProduct: productReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(rootReducers, composeEnhancers());
export default store;