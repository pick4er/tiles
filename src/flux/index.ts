import thunk from 'redux-thunk';
import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';

import game from 'flux/modules/game';
import field from 'flux/modules/field';
import notifications from 'flux/modules/notifications';

export const rootReducer = combineReducers({
  game,
  field,
  notifications,
});
export default createStore(
  rootReducer,
  applyMiddleware(thunk),
);
