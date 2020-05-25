import type { ActionCreator, Action } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import type {
  GetState,
  Dispatch,
  RootState,
  PayloadAction,
} from 'flux/types';
import type {
  OpenableTile,
  TileValue,
  TileId,
} from 'types';

import { createSelector } from 'reselect';
import { compareArrays } from 'helpers';
import { updateRound, setRound } from 'flux/modules/game';
import {
  notifyAboutMatch,
  cancelMatchNotification,
} from 'flux/modules/notifications';

interface State {
  width?: number;
  height?: number;
  tiles?: OpenableTile[];
  idsToMatch: TileId[],
  valuesToIds: Record<TileValue, TileId[]>;
}

// Actions
const SET_TILES = 'FIELD/SET_TILES';
const SET_WIDTH = 'FIELD/SET_WIDTH';
const SET_HEIGHT = 'FIELD/SET_HEIGHT';
const SET_IDS_TO_MATCH = 'FIELD/SET_IDS_TO_MATCH';
const SET_VALUES_TO_IDS = 'FIELD/SET_VALUES_TO_IDS';
const RESET_STATE = 'FIELD/RESET_STATE';

const initialState: State = {
  width: undefined,
  height: undefined,
  tiles: undefined,
  valuesToIds: {},
  idsToMatch: [],
};

// Reducer
export default function reducer(
  state: State = initialState,
  { type, payload }: PayloadAction,
): State {
  switch (type) {
    case SET_TILES:
      return {
        ...state,
        tiles: payload,
      };
    case SET_IDS_TO_MATCH:
      return {
        ...state,
        idsToMatch: payload,
      };
    case SET_VALUES_TO_IDS:
      return {
        ...state,
        valuesToIds: payload,
      };
    case SET_WIDTH:
      return {
        ...state,
        width: payload,
      };
    case SET_HEIGHT:
      return {
        ...state,
        height: payload,
      };
    case RESET_STATE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

// Selectors
const selectFieldModule = (state: RootState) =>
  state.field;

export const selectWidth = createSelector(
  selectFieldModule,
  ({ width }): number | undefined => width,
);

export const selectHeight = createSelector(
  selectFieldModule,
  ({ height }): number | undefined => height,
);

export const selectIdsToMatch = createSelector(
  selectFieldModule,
  ({ idsToMatch }): TileId[] => idsToMatch,
);

export const selectTiles = createSelector(
  selectFieldModule,
  ({ tiles }): OpenableTile[] | undefined => tiles,
);

export const selectValuesToIds = createSelector(
  selectFieldModule,
  ({ valuesToIds }): Record<TileValue, TileId[]> =>
    valuesToIds,
);

export const selectTilesIds = createSelector(
  selectTiles,
  (tiles): TileId[] => (typeof tiles === 'undefined'
    ? []
    : tiles.map(({ id }: OpenableTile) => id)),
);

export const selectTwoDimensionalTiles = createSelector(
  selectTiles,
  selectWidth,
  selectHeight,
  (tiles, width, height): (OpenableTile[])[] => {
    const twoDimensionalTiles: (OpenableTile[])[] = [];

    if (
      typeof width === 'undefined'
      || typeof height === 'undefined'
      || typeof tiles === 'undefined'
    ) {
      return twoDimensionalTiles;
    }

    for (let h = 0; h < height; h++) {
      const rowTiles: OpenableTile[] = [];

      for (let w = 0; w < width; w++) {
        rowTiles.push(tiles[w + (h * width)]);
      }

      twoDimensionalTiles.push(rowTiles);
    }

    return twoDimensionalTiles;
  },
);

export const selectIdsToValues = createSelector(
  selectValuesToIds,
  (valuesToIds): Record<TileId, TileValue> => {
    const idsToValues: Record<TileId, TileValue> = {};

    Object.keys(valuesToIds).forEach((value: TileValue) =>
      (valuesToIds[value] as TileId[]).forEach(
        (identifier: TileId) => {
          idsToValues[identifier] = value;
        },
    ));

    return idsToValues;
  },
);

export const selectTilesOfCurrentValue = createSelector(
  selectIdsToMatch,
  selectValuesToIds,
  selectIdsToValues,
  /* eslint-disable-next-line max-len */
  (selectedTilesIds, valuesToIds, idsToValues): TileId[] | undefined => {
    const value = idsToValues[
      selectedTilesIds[0]
    ] as TileValue | undefined;
    if (typeof value === 'undefined') {
      return undefined;
    }

    return valuesToIds[value];
  },
);

export const selectLeftTiles = createSelector(
  selectTilesOfCurrentValue,
  selectIdsToMatch,
  (sameValueTiles, tilesSelected): number | undefined => {
    if (typeof sameValueTiles === 'undefined') {
      return undefined;
    }

    return sameValueTiles.length - tilesSelected.length;
  },
);

export const selectIsMatch = createSelector(
  selectIdsToValues,
  selectValuesToIds,
  selectIdsToMatch,
  (idsToValues, valuesToIds, ids): boolean | undefined => {
    if (ids.length === 0) {
      return undefined;
    }

    return compareArrays(
      ids,
      valuesToIds[idsToValues[ids[0]]],
    );
  },
);

// Action creators
export const setTiles = (
  payload: OpenableTile[],
): PayloadAction => ({
  type: SET_TILES,
  payload,
});

export const setIdsToMatch = (
  payload: TileId[],
): PayloadAction => ({
  type: SET_IDS_TO_MATCH,
  payload,
});

export const setValuesToIds = (
  payload: Record<TileValue, TileId[]>,
): PayloadAction => ({
  type: SET_VALUES_TO_IDS,
  payload,
});

export const setWidth = (
  payload: number,
): PayloadAction => ({
  type: SET_WIDTH,
  payload,
});

export const setHeight = (
  payload: number,
): PayloadAction => ({
  type: SET_HEIGHT,
  payload,
});

export const resetState = (): Action => ({
  type: RESET_STATE,
});

// Middleware
export const initTiles: ActionCreator<
// types: return, root state, extra args, action
ThunkAction<void, RootState, void, PayloadAction>
> = () => (
  dispatch: Dispatch,
  getState: GetState
): void => {
  const state: RootState = getState();
  const width = selectWidth(state);
  const height = selectHeight(state);

  if (
    typeof width === 'undefined'
    || typeof height === 'undefined'
  ) {
    throw new TypeError('Specify field dimensions first');
  }

  const tiles: OpenableTile[] = [];
  for (let id = 0; id < width * height; id++) {
    tiles.push({ id, isOpen: false });
  }

  dispatch<PayloadAction>(setTiles(tiles));
};

export const initValuesToIds: ActionCreator<
ThunkAction<void, RootState, void, PayloadAction>
> = (values: TileValue[]) => (
  dispatch: Dispatch,
  getState: GetState
): void => {
  const tilesIds = selectTilesIds(getState());
  const valuesToIds: Record<TileValue, TileId[]> = {};

  let valueId = 0;
  let identifierId = 0;
  while (identifierId < tilesIds.length) {
    const value = values[valueId];
    const firstIdentifier = tilesIds[identifierId];
    const secondIdentifier = tilesIds[identifierId + 1];

    if (!valuesToIds[value]) {
      valuesToIds[value] = [];
    }

    // out of ids range
    if (typeof secondIdentifier === 'undefined') {
      // identifier must have a value couple
      valuesToIds[value] = valuesToIds[value].concat(
        firstIdentifier,
      );
    } else {
      valuesToIds[value] = valuesToIds[value].concat([
        firstIdentifier, secondIdentifier,
      ]);
    }

    valueId += 1;
    if (valueId === values.length) {
      valueId = 0;
    }

    identifierId += 2; // two tiles at least
  }

  dispatch(setValuesToIds(valuesToIds));
};

export const mixTiles: ActionCreator<
ThunkAction<void, RootState, void, PayloadAction>
> = () => (
  dispatch: Dispatch,
  getState: GetState
): void => {
  const tiles: OpenableTile[] = 
    JSON.parse(JSON.stringify(selectTiles(getState())));

  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(
      Math.random() * (i + 1),
    ) as number;

    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }

  dispatch(setTiles(tiles));
};

export const openTile: ActionCreator<
ThunkAction<void, RootState, void, PayloadAction>
> = (tileId: TileId) => (
  dispatch: Dispatch,
  getState: GetState
): undefined => {
  const tiles = JSON.parse(JSON.stringify(
    selectTiles(getState()),
  ));
  const tile = tiles.find(
    ({ id }: OpenableTile) => id === tileId,
  ) as OpenableTile;
  if (tile.isOpen) {
    return;
  }

  tile.isOpen = true;
  const nextIdsToMatch: TileId[] =
    selectIdsToMatch(getState()).concat(tileId);

  dispatch(cancelMatchNotification());
  dispatch(setIdsToMatch(nextIdsToMatch));

  const isMatch = selectIsMatch(getState());
  if (isMatch === false) {
    // close all selected tiles for this round
    nextIdsToMatch.forEach((_id) => {
      const tileToClose = tiles.find(
        ({ id }: OpenableTile) => id === _id,
      );
      tileToClose.isOpen = false;
    });

    // nevertheless, open clicked tile
    tile.isOpen = true;
    dispatch(setIdsToMatch([tileId]));

    dispatch(setTiles(tiles));
    dispatch(updateRound());
    dispatch(notifyAboutMatch(isMatch));
  } else if (isMatch === true) {
    dispatch(setIdsToMatch([]));
    dispatch(setTiles(tiles));
    dispatch(notifyAboutMatch(isMatch));
  } else if (typeof isMatch === 'undefined') {
    dispatch(setTiles(tiles));
  }

  
};

export const initField: ActionCreator<
ThunkAction<void, RootState, void, PayloadAction>
> = (
  values: TileValue[],
  width?: number,
  height?: number,
) => (dispatch: Dispatch): void => {
  dispatch(setHeight(width || 4));
  dispatch(setWidth(height || 4));
  dispatch(initTiles());
  dispatch(initValuesToIds(values));
  dispatch(mixTiles());
};

export const startNewGame: ActionCreator<
ThunkAction<void, RootState, void, PayloadAction>
> = (
  values: TileValue[],
  width?: number,
  height?: number,
) => (dispatch: Dispatch): void => {
  dispatch(cancelMatchNotification());
  dispatch(setRound(1));
  dispatch(resetState());
  dispatch(initField(values, width, height));
};
