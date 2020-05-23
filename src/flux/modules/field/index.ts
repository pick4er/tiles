import type { RootState } from 'flux/types';
import type {
  OpenableTilesInterface,
  TilesValuesInterface,
  TileId,
} from 'libs/types';

import { createSelector } from 'reselect';
import { OpenableTiles } from 'libs/tiles';
import { TilesValues, defaultValues } from 'libs/values';

interface State {
  tiles?: OpenableTilesInterface;
  tilesValues?: TilesValuesInterface;
}

interface Action {
  type: string;
  payload?: any;
}

// Actions
const SET_TILES = 'FIELD/SET_TILES'
const SET_TILES_VALUES = 'FIELD/SET_TILES_VALUES'

const initialState: State = {
  tiles: undefined,
  tilesValues: undefined,
}

// Reducer
export default function reducer(
  state: State = initialState,
  { type, payload }: Action
) {
  switch (type) {
    case SET_TILES:
      return {
        ...state,
        tiles: payload.tiles
      }
    case SET_TILES_VALUES:
      return {
        ...state,
        tilesValues: payload.tilesValues
      }
    default:
      return state
  }
}

// Selectors
const selectFieldModule = (state: RootState) => state.field

export const selectTiles = createSelector(
  selectFieldModule,
  ({ tiles }) => tiles
)

export const selectTwoDimensionalTiles = createSelector(
  selectTiles,
  tiles => tiles.twoDimensionalTiles
)

export const selectIdsToValues = createSelector(
  selectFieldModule,
  ({ tilesValues }) => tilesValues.idsToValues
)

// Action creators
export const setTiles = (
  payload: OpenableTilesInterface
): Action => ({
  type: SET_TILES,
  payload,
})

export const setTilesValues = (
  payload: TilesValuesInterface
): Action => ({
  type: SET_TILES_VALUES,
  payload
})

// Middleware
export const initField = () => dispatch => {
  const tiles = new OpenableTiles(4, 4)
  const values = new TilesValues(
    tiles.tilesIds,
    defaultValues
  )

  dispatch(setTiles(tiles))
  dispatch(setTilesValues(values))
}

export const toggleTile = (id: TileId) => (
  dispatch,
  getState
) => {
  const tiles = selectTiles(getState())
  tiles.toggleTile
}
