import type { ActionCreator } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import type {
  RootState,
  PayloadAction,
} from 'flux/types';

import { createSelector } from 'reselect';
import { MatchNotifications }  from 'flux/types';

interface State {
  isMatchNotification?: MatchNotifications;
}

const SET_IS_MATCH_NOTIFICATION =
  'NOTIFICATIONS/SET_IS_MATCH_NOTIFICATION'

const initialState: State = {
  isMatchNotification: undefined
}

export default function reducer(
  state: State = initialState,
  { type, payload }: PayloadAction
) {
  switch (type) {
    case SET_IS_MATCH_NOTIFICATION:
      return {
        ...state,
        isMatchNotification: payload
      }
    default:
      return state
  }
}

// Selector
const notificationsModule = (state: RootState) =>
  state.notifications

export const selectIsMatchNotification = createSelector(
  notificationsModule,
  ({ isMatchNotification }): MatchNotifications | undefined =>
    isMatchNotification
)

// Action creators
export const setIsMatchNotification = (
  payload: MatchNotifications | undefined
): PayloadAction => ({
  type: SET_IS_MATCH_NOTIFICATION,
  payload
})

// Middleware
export const notifyAboutMatch: ActionCreator<
  ThunkAction<void, RootState, void, PayloadAction>
> = (isMatch: boolean | undefined) => (
  dispatch,
  getState
) => {
  let matchNotification: string = ''

  switch (isMatch) {
    case true:
      matchNotification = MatchNotifications.Match
      break
    case false:
      matchNotification = MatchNotifications.NotMatch
      break
    case undefined:
      matchNotification = MatchNotifications.PartiallyMatch
      break
    default:
      throw new TypeError(`Cannot notify about match status with ${isMatch} value`)
  }

  dispatch(setIsMatchNotification(
    matchNotification as MatchNotifications
  ))
  // TODO: rewrite on sagas
  setTimeout(() => {
    dispatch(setIsMatchNotification(undefined))
  }, 2000)
}