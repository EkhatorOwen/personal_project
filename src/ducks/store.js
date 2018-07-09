import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import promiseMiddleware from "redux-promise-middleware";
//import teamReducer from './teamMember/memberReducer'
import SignupReducer from "./teamLead/SignupReducer";
import ViewProfileReducer from "./teamLead/ViewProfileReducer.js";
import AddProjectReducer from "./teamLead/AddProjectReducer";
import GetProjectsReducer from './teamLead/GetProjectsReducer'
import GetPeopleReducer from './teamMember/GetPeopleReducer'
import GetTaskReducer from './task/GetTaskReducer'
import GetPeopleChatReducer from './chat/GetPeopleChatReducer'
import ClassReducer from './class/ClassReducer'
import ChatReducer from './chat/ChatReducer.js'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(promiseMiddleware()));

const combinedReducers = combineReducers({
  Signup: SignupReducer,
  ViewProfile: ViewProfileReducer,
  AddProject: AddProjectReducer,
  GetProject: GetProjectsReducer,
  GetPeople: GetPeopleReducer,
  GetTask: GetTaskReducer,
  GetPeopleChat: GetPeopleChatReducer,
  ClassReducer: ClassReducer,
  ChatReducer: ChatReducer
});

//const middlewares = composeEnhancers(applyMiddleware(promiseMiddleware()));

const store = createStore(combinedReducers, enhancer);

export default store;
