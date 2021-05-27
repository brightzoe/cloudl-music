import { combineReducers } from "redux-immutable";
import { reducer as recommendReducer } from "../application/Recommend/store/index";
export default combineReducers({
	//添加reducer
	recommend:recommendReducer,
});
