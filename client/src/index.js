import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ticTacToeApp from './Reducer/reducer';
import GameBoard from './Container/container';
import loginForm from './Component/loginForm';
import registerForm from './Component/registerForm';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

// import Game from './Component/game';
import './index.css';
import * as serviceWorker from './serviceWorker';

const store = createStore(ticTacToeApp);
render(
  <Provider store={store}>
    <Router>
      <Switch>
        {/* <Route path="/"></Route> */}
        <Route path="/user/login" exact component={loginForm}></Route>
        <Route path="/user/register" exact component={registerForm}></Route>
        <Route path="/game" exact component={GameBoard}></Route>
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
