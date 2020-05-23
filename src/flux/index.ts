import { createStore } from 'redux';
import { combineReducers } from 'redux';

import game from 'flux/modules/game';
import field from 'flux/modules/field';

export default createStore(combineReducers({
  game,
  field
}));
