import type { Action } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';

import { rootReducer } from 'flux';

export type RootState = ReturnType<typeof rootReducer>;

export interface PayloadAction extends Action<string> {
  payload?: any;
}

export interface GetState {
  (): RootState;
}

export type Dispatch = ThunkDispatch<
  RootState,
  void,
  PayloadAction
>

export enum MatchNotifications {
  Match = 'MATCH',
  NotMatch = 'NOT_MATCH',
  PartiallyMatch = 'PARTIALLY_MATCH',
}
