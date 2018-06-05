import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import promiseMiddleware from 'redux-promise-middleware';
//import teamReducer from './teamMember/memberReducer'
import SignupReducer from './teamLead/SignupReducer'

 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

 const enhancer = composeEnhancers (applyMiddleware(promiseMiddleware()))

const combinedReducers = combineReducers({
   
    SignupReducer: SignupReducer
    })

const middlewares = composeEnhancers(applyMiddleware(promiseMiddleware()))

const store = createStore(combinedReducers,enhancer)

export default store;
