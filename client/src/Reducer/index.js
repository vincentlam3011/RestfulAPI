import { combineReducers } from 'redux';

import ticTacToeApp from './gameReducer';
import { authentication } from './loginReducer';
import { registration } from './registerReducer';
import { alert } from './alerts';

const rootReducer = combineReducers({
    ticTacToeApp,
    registration,
    authentication,
    alert
});

export default rootReducer;