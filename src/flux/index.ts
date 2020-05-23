import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunk from 'thunk';

import game from 'flux/modules/game';
import field from 'flux/modules/field';

const reducer = createStore(
  combineReducers({
    game, field
  }),
  applyMiddleware(thunk)
);

export type RootState = ReturnType<typeof reducer>
export default reducer
