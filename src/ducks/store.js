import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import promiseMiddleware from "redux-promise-middleware";
//import teamReducer from './teamMember/memberReducer'
import SignupReducer from "./teamLead/SignupReducer";
import ViewProfileReducer from "./teamLead/ViewProfileReducer.js";
import AddProjectReducer from "./teamLead/AddProjectReducer";
import GetProjectsReducer from './teamLead/GetProjectsReducer'
import GetPeopleReducer from './teamMember/GetPeopleReducer'
import GetTaskReducer from './task/GetTaskReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(promiseMiddleware()));

const combinedReducers = combineReducers({
  Signup: SignupReducer,
  ViewProfile: ViewProfileReducer,
  AddProject: AddProjectReducer,
  GetProject: GetProjectsReducer,
  GetPeople: GetPeopleReducer,
  GetTask: GetTaskReducer
});

//const middlewares = composeEnhancers(applyMiddleware(promiseMiddleware()));

const store = createStore(combinedReducers, enhancer);

export default store;
