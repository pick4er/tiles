import type {
  OpenableTilesInterface,
  TilesValuesInterface
} from 'libs/types';

import { createSelector } from 'reselect';

import { OpenableTiles } from 'libs/tiles';
import { TilesValues, defaultValues } from 'libs/values';

interface State {
  tiles?: OpenableTilesInterface;
  values?: TilesValuesInterface;
}

interface Action {
  type: string;
  payload?: any;
}

// Actions
const INIT = 'FIELD/INIT'

const initialState: State = {
  tiles: undefined,
  values: undefined,
}

// Reducer
export default function reducer(
  state: State = initialState,
  { type, payload }: Action
) {
  switch (type) {
    case INIT:
      debugger
      return {
        ...initialState,
        tiles: payload.tiles,
        values: payload.values,
      }
    default:
      return state
  }
}

// Action creators
export function initField(): Action {
  const tiles = new OpenableTiles(4, 4)
  const values = new TilesValues(tiles, defaultValues)
  debugger

  return {
    type: INIT,
    payload: { tiles, values }
  }
}

// Selectors
const selectFieldModule = state => state.field

export const selectTiles = createSelector(
  selectFieldModule,
  field => field.tiles.twoDimensionalTiles
)

export const selectValues = createSelector(
  selectFieldModule,
  field => field.value.idsToValues
)
