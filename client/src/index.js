import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
// import rootReducer from './Reducer/index'
import GameBoard from './Container/gameContainer';
import { loginForm } from './Component/loginForm';
import { registerForm } from './Component/registerForm';
import { combineReducers } from 'redux';
import ticTacToeApp from './Reducer/gameReducer';
import { authentication } from './Reducer/loginReducer';
import { registration } from './Reducer/registerReducer';
import { alert } from './Reducer/alerts';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import './index.css';
import * as serviceWorker from './serviceWorker';

const logger = createLogger();

const rootReducer = combineReducers({
  ticTacToeApp,
  registration,
  authentication,
  alert
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));
const myStore = createStore(ticTacToeApp);
render(
  <Provider store={store}>
    <Router>
      <Switch>
        {/* <Route path="/"></Route> */}
        <Route path="/user/login" exact component={loginForm}></Route>
        <Route path="/user/register" exact component={registerForm}></Route>
        <Provider store={myStore}>
          <Route path="/game" exact component={GameBoard}></Route>
        </Provider>
        <Redirect to="/user/login"></Redirect>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
