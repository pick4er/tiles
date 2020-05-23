import { createStore } from 'redux';
import { combineReducers } from 'redux';

import game from 'flux/modules/game';
import field from 'flux/modules/field';

const reducer = createStore(combineReducers({
  game,
  field
}));

export type RootState = ReturnType<typeof reducer>
export default reducer
