import type { Action } from 'redux';
import { rootReducer } from 'flux';

export type RootState = ReturnType<typeof rootReducer>;

export interface PayloadAction extends Action<string> {
  payload?: any;
}

export enum MatchNotifications {
  Match = 'MATCH',
  NotMatch = 'NOT_MATCH',
  PartiallyMatch = 'PARTIALLY_MATCH',
}
