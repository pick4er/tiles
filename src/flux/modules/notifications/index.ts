import type { ActionCreator } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import type {
  Timeout,
  GetState,
  Dispatch,
  RootState,
  PayloadAction,
} from 'flux/types';

import { createSelector } from 'reselect';
import {
  WinNotifications,
  MatchNotifications,
} from 'flux/types';

interface State {
  isMatchNotification?: MatchNotifications;
  isWinNotification?: WinNotifications;
  isMatchTimer?: Timeout;
  isWinTimer?: Timeout;
}

const SET_IS_MATCH_NOTIFICATION =
  'NOTIFICATIONS/SET_IS_MATCH_NOTIFICATION';
const SET_IS_MATCH_TIMER =
  'NOTIFICATIONS/SET_IS_MATCH_TIMER';
const SET_IS_WIN_NOTIFICATION =
  'NOTIFICATIONS/SET_IS_WIN_NOTIFICATION';
const SET_IS_WIN_TIMER =
  'NOTIFICATIONS/SET_IS_WIN_TIMER';

const initialState: State = {
  isMatchNotification: undefined,
  isWinNotification: undefined,
  isMatchTimer: undefined,
  isWinTimer: undefined,
};

export default function reducer(
  state: State = initialState,
  { type, payload }: PayloadAction,
): State {
  switch (type) {
    case SET_IS_MATCH_NOTIFICATION:
      return {
        ...state,
        isMatchNotification: payload,
      };
    case SET_IS_MATCH_TIMER:
      return {
        ...state,
        isMatchTimer: payload,
      };
    case SET_IS_WIN_NOTIFICATION:
      return {
        ...state,
        isWinNotification: payload,
      }
    case SET_IS_WIN_TIMER:
      return {
        ...state,
        isWinTimer: payload
      }
    default:
      return state;
  }
}

// Selector
const notificationsModule = (state: RootState) =>
  state.notifications;

export const selectIsMatchNotification = createSelector(
  notificationsModule,
  /* eslint-disable-next-line max-len */
  ({ isMatchNotification }): MatchNotifications | undefined =>
    isMatchNotification,
);

export const selectIsMatchTimer = createSelector(
  notificationsModule,
  ({ isMatchTimer }): Timeout | undefined =>
    isMatchTimer,
);

export const selectIsWinNotification = createSelector(
  notificationsModule,
  ({ isWinNotification }): WinNotifications | undefined =>
    isWinNotification,
)

export const selectIsWinTimer = createSelector(
  notificationsModule,
  ({ isWinTimer }): Timeout | undefined =>
    isWinTimer
)

// Action creators
export const setIsMatchNotification = (
  payload: MatchNotifications | undefined,
): PayloadAction => ({
  type: SET_IS_MATCH_NOTIFICATION,
  payload,
});

export const setIsMatchTimer = (
  payload: Timeout | undefined,
): PayloadAction => ({
  type: SET_IS_MATCH_TIMER,
  payload,
});

export const setIsWinNotification = (
  payload: WinNotifications | undefined,
): PayloadAction => ({
  type: SET_IS_WIN_NOTIFICATION,
  payload,
})

export const setIsWinTimer = (
  payload: Timeout | undefined,
): PayloadAction => ({
  type: SET_IS_WIN_TIMER,
  payload,
});

// Middleware
export const notifyAboutWin: ActionCreator<
ThunkAction<void, RootState, void, PayloadAction>
> = (
  isWin: boolean
) => (
  dispatch: Dispatch
): void => {
  let winNotification = '';

  switch (isWin) {
    case true:
      winNotification = WinNotifications.Win;
      break;
    case false:
      winNotification = WinNotifications.Loose;
      break;
    default:
      throw new TypeError(`
        Cannot notify about win \
        status with ${isWin} value
      `);
  }

  dispatch(setIsWinNotification(
    winNotification as WinNotifications
  ));

  const winTimer = setTimeout(() => {
    dispatch(setIsWinNotification(undefined));
  }, 20000);
  dispatch(setIsWinTimer(winTimer))
}

export const notifyAboutMatch: ActionCreator<
ThunkAction<void, RootState, void, PayloadAction>
> = (
  isMatch: boolean | undefined
) => (
  dispatch: Dispatch
): void => {
  let matchNotification = '';

  switch (isMatch) {
    case true:
      matchNotification = MatchNotifications.Match;
      break;
    case false:
      matchNotification = MatchNotifications.NotMatch;
      break;
    case undefined:
      matchNotification =
        MatchNotifications.PartiallyMatch;
      break;
    default:
      throw new TypeError(`
        Cannot notify about match \
        status with ${isMatch} value
      `);
  }

  dispatch(setIsMatchNotification(
    matchNotification as MatchNotifications,
  ));
  // TODO: rewrite on sagas
  const matchTimer = setTimeout(() => {
    dispatch(setIsMatchNotification(undefined));
  }, 1500);
  dispatch(setIsMatchTimer(matchTimer))
};

export const cancelMatchNotification: ActionCreator<
ThunkAction<void, RootState, void, PayloadAction>
> = () => (
  dispatch: Dispatch,
  getState: GetState
): void => {
  const isMatchTimer =
    selectIsMatchTimer(getState())

  if (typeof isMatchTimer !== 'undefined') {
    clearTimeout(isMatchTimer)
    dispatch(setIsMatchTimer(undefined));
    dispatch(setIsMatchNotification(undefined));
  }
};

export const cancelWinNotification: ActionCreator<
ThunkAction<void, RootState, void, PayloadAction>
> = () => (
  dispatch: Dispatch,
  getState: GetState
): void => {
  const isWinTimer =
    selectIsWinTimer(getState());

  if (typeof isWinTimer !== 'undefined') {
    clearTimeout(isWinTimer);
    dispatch(setIsWinTimer(undefined));
    dispatch(setIsWinNotification(undefined));
  }
};
