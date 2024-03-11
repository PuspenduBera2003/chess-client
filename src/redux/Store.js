import { createStore, combineReducers } from "redux"
import PassPlayReducer from "./OfflinePlay/Reducers/PassPlayReducers"
import AuthReducer from "./Auth/Reducers/AuthReducer"
import ThemeReducer from "./Theme/Reducer/ThemeReducer";
import MultiPlayerReducer from "./MultiPlayer/Reducers/MultiPlayerReducer";


const rootReducer = combineReducers({
  PassPlay: PassPlayReducer,
  Auth: AuthReducer,
  Theme: ThemeReducer,
  MultiPlayer: MultiPlayerReducer
});

const store = createStore(rootReducer)

export default store