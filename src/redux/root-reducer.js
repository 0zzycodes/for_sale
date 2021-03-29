import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import dashboardReducer from "./dashboard/reducers";
import shopReducer from "./shop/reducers";
import userReducer from "./user/reducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["shop", "dashboard"],
};

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  shop: shopReducer,
  user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
