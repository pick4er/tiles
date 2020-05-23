import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';

import game from 'flux/modules/game';
import field from 'flux/modules/field';

const rootReducer = combineReducers({ game, field })

export type RootState = ReturnType<typeof rootReducer>
export default createStore(
  rootReducer,
  applyMiddleware(thunk)
);
