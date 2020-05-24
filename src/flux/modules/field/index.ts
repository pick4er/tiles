import type { ActionCreator, Action } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import type { RootState } from 'flux/types';
import type {
  OpenableTile,
  TileValue,
  TileId,
} from 'types';

import { createSelector } from 'reselect';
import { isUndefined, compareArrays } from 'helpers'

interface State {
  width?: number;
  height?: number;
  tiles?: OpenableTile[];
  values?: string[];
  isMatch?: boolean;
  idsToMatch?: TileId[]
}

interface PayloadAction extends Action<string> {
  payload?: any;
}

// Actions
const SET_TILES = 'FIELD/SET_TILES'
const SET_VALUES = 'FIELD/SET_VALUES'
const SET_WIDTH = 'FIELD/SET_WIDTH'
const SET_HEIGHT = 'FIELD/SET_HEIGHT'
const SET_IS_MATCH = 'FIELD/SET_IS_MATCH'
const SET_IDS_TO_MATCH = 'FIELD/SET_IDS_TO_MATCH'

const initialState: State = {
  width: undefined,
  height: undefined,
  tiles: undefined,
  values: undefined,
  isMatch: undefined,
  idsToMatch: undefined,
}

// Reducer
export default function reducer(
  state: State = initialState,
  { type, payload }: PayloadAction
) {
  switch (type) {
    case SET_TILES:
      return {
        ...state,
        tiles: payload
      }
    case SET_IDS_TO_MATCH:
      return {
        ...state,
        idsToMatch: payload
      }
    case SET_VALUES:
      return {
        ...state,
        values: payload
      }
    case SET_IS_MATCH:
      return {
        ...state,
        isMatch: payload
      }
    case SET_WIDTH:
      return {
        ...state,
        width: payload
      }
    case SET_HEIGHT:
      return {
        ...state,
        height: payload
      }
    default:
      return state
  }
}

// Selectors
const selectFieldModule = (state: RootState) => state.field

export const selectWidth = createSelector(
  selectFieldModule,
  ({ width }): number | undefined => width
)

export const selectHeight = createSelector(
  selectFieldModule,
  ({ height }): number | undefined => height
)

export const selectIsMatch = createSelector(
  selectFieldModule,
  ({ isMatch }): boolean | undefined => isMatch
)

export const selectIdsToMatch = createSelector(
  selectFieldModule,
  ({ idsToMatch }): TileId[] | undefined => idsToMatch
)

export const selectTiles = createSelector(
  selectFieldModule,
  ({ tiles }): OpenableTile[] | undefined => tiles
)

export const selectTilesIds = createSelector(
  selectTiles,
  (tiles): TileId[] | undefined => 
    isUndefined(tiles)
      ? []
      : tiles.map(({ id }: OpenableTile) => id)
)

export const selectTwoDimensionalTiles = createSelector(
  selectTiles,
  selectWidth,
  selectHeight,
  (tiles, width, height): (OpenableTile[])[] => {
    const twoDimensionalTiles: (OpenableTile[])[] = [];

    if (
      isUndefined(width) ||
      isUndefined(height) ||
      isUndefined(tiles)
    ) {
      return twoDimensionalTiles
    }

    for (let h = 0; h < height; h++) {
      const rowTiles: OpenableTile[] = [];

      for (let w = 0; w < width; w++) {
        rowTiles.push(tiles[w + (h * width)])
      }

      twoDimensionalTiles.push(rowTiles)
    }

    return twoDimensionalTiles
  }
)

export const selectValues = createSelector(
  selectFieldModule,
  ({ values }): string[] => values
)

export const selectValuesToIds = createSelector(
  selectTilesIds,
  selectValues,
  (tilesIds, values): Record<TileValue, TileId[]> => {
    const valuesToIds: Record<TileValue, TileId[]> = {}

    if (isUndefined(tilesIds)) {
      return valuesToIds
    }

    let valueId = 0;
    let identifierId = 0;
    while (identifierId < tilesIds.length) {
      const value = values[valueId]
      const firstIdentifier = tilesIds[identifierId]
      const secondIdentifier = tilesIds[identifierId + 1]

      if (!valuesToIds[value]) {
        valuesToIds[value] = []
      }

      // out of ids range
      if (isUndefined(secondIdentifier)) {
        // identifier must have a value couple
        valuesToIds[value] = valuesToIds[value].concat(
          firstIdentifier
        )
      } else {
        valuesToIds[value] = valuesToIds[value].concat([
          firstIdentifier, secondIdentifier
        ])
      }

      valueId += 1;
      if (valueId === values.length) {
        valueId = 0;
      }

      identifierId += 2; // two symbols at least
    }

    return valuesToIds
  }
)

export const selectIdsToValues = createSelector(
  selectValuesToIds,
  (valuesToIds): Record<TileId, TileValue> => {
    const idsToValues: Record<TileId, TileValue> = {}

    for (let value of Object.keys(valuesToIds)) {
      for (let identifier of valuesToIds[value]) {
        idsToValues[identifier] = value as TileValue
      }
    }

    return idsToValues
  }
)

// Action creators
export const setTiles = (
  payload: OpenableTile[]
): PayloadAction => ({
  type: SET_TILES,
  payload
})

export const setIsMatch = (
  payload: boolean | undefined
): PayloadAction => ({
  type: SET_IS_MATCH,
  payload
})

export const setValues = (
  payload: TileValue[]
): PayloadAction => ({
  type: SET_VALUES,
  payload
})

export const setWidth = (
  payload: number
): PayloadAction => ({
  type: SET_WIDTH,
  payload
})

export const setHeight = (
  payload: number
): PayloadAction => ({
  type: SET_HEIGHT,
  payload
})

// Middleware
export const initTiles: ActionCreator<
  // types: return, root state, extra args, action
  ThunkAction<void, RootState, void, PayloadAction>
> = () => (dispatch, getState) => {
  const state: RootState = getState()
  const width = selectWidth(state)
  const height = selectHeight(state)

  if (
    isUndefined(width) ||
    isUndefined(height)
  ) {
    throw new TypeError('Specify field dimensions first')
  }

  const tiles: OpenableTile[] = []
  for (let id = 0; id < width * height; id++) {
    tiles.push({ id, isOpen: false })
  }

  dispatch<PayloadAction>(setTiles(tiles))
}

export const mixTiles: ActionCreator<
  ThunkAction<void, RootState, void, PayloadAction>
> = () => (dispatch, getState) => {
  const tiles: OpenableTile[] =
    JSON.parse(JSON.stringify(selectTiles(getState())))

  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(
      Math.random() * (i + 1)
    ) as number

    [tiles[i], tiles[j]] =
      [tiles[j], tiles[i]]
  }

  dispatch(setTiles(tiles))
}

export const toggleTile: ActionCreator<
  ThunkAction<void, RootState, void, PayloadAction>
> = (tileId: TileId) => (
  dispatch,
  getState
) => {
  const tiles: OpenableTile[] =
    JSON.parse(JSON.stringify(selectTiles(getState())))

  const tile = tiles.find(({ id }) => id === tileId)
  if (!tile) {
    throw new TypeError('No tile matches provided id')
  }

  tile.isOpen = !tile.isOpen

  dispatch(setTiles(tiles))
}

export const areIdsMatch: ActionCreator<
  ThunkAction<void, RootState, void, PayloadAction>
> = (ids?: TileId[]) => (dispatch, getState) => {
  const idsToValues = selectIdsToValues(getState())
  const valuesToIds = selectValuesToIds(getState())

  if (isUndefined(ids)) {
    dispatch(setIsMatch(undefined))
    return
  }

  const valueToGuess = idsToValues[ids[0]]
  const idsOfValue = valuesToIds[valueToGuess]
  dispatch(setIsMatch(compareArrays(ids, idsOfValue)))
}

export const initField: ActionCreator<
  ThunkAction<void, RootState, void, PayloadAction>
> = (values: TileValue[]) => dispatch => {
  dispatch(setValues(values))
  dispatch(setHeight(4))
  dispatch(setWidth(4))
  dispatch(initTiles())
}
