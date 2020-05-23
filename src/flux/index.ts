import thunk from 'redux-thunk';
import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';

import game from 'flux/modules/game';
import field from 'flux/modules/field';

export const rootReducer = combineReducers({ game, field })
export default createStore(
  rootReducer,
  applyMiddleware(thunk)
);
