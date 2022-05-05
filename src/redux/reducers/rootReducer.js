import { combineReducers } from "redux";

import loginReducer from "./loginReducer";
import getAllReducer from "./getAllReducer";
import getUserReducer from "./getUserReducer";
import getTeamReducer from "./getTeamReducer";

const rootReducer = combineReducers({
  login:loginReducer,
  getAllUsers:getAllReducer,
  getUser:getUserReducer,
  getTeam:getTeamReducer,
});

export default rootReducer;