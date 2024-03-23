import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from 'redux-thunk';
import PassPlayReducer from "./OfflinePlay/Reducers/PassPlayReducers";
import AuthReducer from "./Auth/Reducers/AuthReducer";
import ThemeReducer from "./Theme/Reducer/ThemeReducer";
import MultiPlayerReducer from "./MultiPlayer/Reducers/MultiPlayerReducer";

const rootReducer = combineReducers({
  PassPlay: PassPlayReducer,
  Auth: AuthReducer,
  Theme: ThemeReducer,
  MultiPlayer: MultiPlayerReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;