import type { ActionCreator } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import type {
  GetState,
  Dispatch,
  RootState,
  PayloadAction,
} from 'flux/types';

import { createSelector } from 'reselect';

interface State {
  round: number;
}

export const GAME_OVER_ROUNDS_THRESHOLD = 5;

// Actions
const SET_ROUND = 'GAME/SET_ROUND';

const initialState: State = {
  round: 1,
};

// Reducer
export default function reducer(
  state: State = initialState,
  { type, payload }: PayloadAction,
): State {
  switch (type) {
    case SET_ROUND:
      return {
        ...state,
        round: payload,
      };
    default:
      return state;
  }
}

// Selectors
const selectGameModule = (state: RootState) => state.game;

export const selectRound = createSelector(
  selectGameModule,
  ({ round }): number => round,
);

// Action creators
export const setRound = (
  payload: number,
): PayloadAction => ({
  type: SET_ROUND,
  payload,
});

// Middleware
export const updateRound: ActionCreator<
// types: return, root state, extra args, action
ThunkAction<void, RootState, void, PayloadAction>
> = () => (
  dispatch: Dispatch,
  getState: GetState
): void => {
  dispatch(setRound(selectRound(getState()) + 1));
};
